import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { addProspect, getProgram, pay, registration, logout, updateUser, getSubscription, paySubscription } from 'modules/marketing/actions'
import { OrderCard } from 'components'
import { useQuery } from 'utils'
import { BIRD_MARKETING_WEBSITE } from 'utils/constants'
import { formatCurrencyToTwoDecimals } from 'utils/formatCurrency'
import { Checkbox } from 'antd'
import { PromoCode, FormSignUp, FormSignIn, Button } from '../components'
import logo from '../../../../../static/img/logo.jpg'
import config from 'config'
import css from './index.less'

const Main = () => {
  const [bonus, setBonus] = useState(0)
  const [programTotal, setProgramTotal] = useState(0)
  const [coupon, setCoupon] = useState('')
  const [cardError, setCardError] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [cancelPlan, setCancelPlan] = useState(false)
  const [isDisabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [prefix, setPrefix] = useState('')
  const [phone, setPhone] = useState('')

  const { program, token, user, plan } = useSelector(({ marketing }) => marketing)

  const refForm = useRef(null)
  const history = useHistory()
  const dispatch = useDispatch()
  const stripe = useStripe()
  const elements = useElements()
  const query = useQuery()

  const url = window.location.pathname.split('/')
  const alias = url[2] || url[1]
  const { pathname, search } = useLocation()

  const isSubscription = search?.split('&')?.[0]?.includes('subscription')
  const isSignedIn = pathname === `/${alias}` && !!Object.keys(user).length

  const urlMarketing = config.urlMarketing
  const urlAllTeams = `${urlMarketing}teams`

  useEffect(() => {
    if (alias) {
      isSubscription ? dispatch(getSubscription(alias)) : dispatch(getProgram(alias))
    }

    const queryParamsForForm = ['email', 'firstName', 'lastName']

    const queryParams = queryParamsForForm.reduce((accum, param) => {
      accum[param] = query.get(param)
      return accum
    }, {})

    const queryPrefix = query.get('prefix') || ''
    const queryPhone = query.get('phone') || ''

    setPrefix(queryPrefix)
    setPhone(queryPhone)

    const numQueryParams = Object.values(queryParams).length
    const areQueryParams = !!numQueryParams
    const allExpectedProspectValues = numQueryParams === queryParamsForForm.length && queryPhone !== '' && alias

    if (allExpectedProspectValues) {
      const newProspect = { ...queryParams, phone: queryPrefix + queryPhone, program: alias }
      dispatch(addProspect(newProspect))
    }

    if (areQueryParams || isSignedIn) {
      const form = refForm?.current?.props?.form

      if (form) {
        for (const [key, value] of Object.entries(queryParams)) {
          form.setFieldsValue({ [key]: isSignedIn ? user[key] : value })
        }
      }
    }
  }, [])

  const onChangeValues = async e => {
    const form = refForm?.current?.props?.form

    // Ant's Select element sends the selected 'value' onChange
    if (e.target) await form.validateFields([e.target.value], { force: true })
    const formValues = form.getFieldsValue()
    const isFieldMissing = Object.entries(formValues).some(([key, val]) => !val)
    if (!isFieldMissing) await form.validateFields({ force: true })

    setDisabled(isFieldMissing)
  }

  const clearToken = () => {
    if (token) {
      dispatch(logout())
    }
  }

  const goBack = () => {
    clearToken()
    window.location = urlMarketing + (isSubscription ? '' : `teams/${alias}`)
  }

  const signOut = () => {
    clearToken()
    history.push({ pathname: `/sign-up/${alias}`, search })
  }

  const onFinishSignUp = async (values, isError, err) => {
    if (!stripe || !elements) return

    const form = refForm?.current?.props?.form

    if (form) {
      form.validateFields((err, values) => {
        if (err) return null
        setLoading(true)

        const data = {
          email: values.email,
          first_name: values.firstName,
          last_name: values.lastName,
          address: values.address,
          city: values.city,
          state: values.state,
          zip_code: values.zipCode,
          country: 'US',
          phone: prefix + phone,
          program: alias,
          ...isSubscription ? { athletePlanId: program?.athletePlanId } : {},
        }

        dispatch(registration(data)).then(async res => {
          if (res) {
            const cardElement = elements.getElement(CardElement)

            await stripe.createToken(cardElement).then(({ error, token }) => {
              if (error) return null

              const paymentData = {
                token: token.id,
                email: values.email,
                ...isSubscription ? { athletePlanId: program?.athletePlanId } : { program: alias },
                ...coupon ? { coupon } : {},
              }

              const payFunc = isSubscription ? paySubscription : pay

              dispatch(payFunc(paymentData)).then(res => {
                if (res) {
                  let redirectURL = `${BIRD_MARKETING_WEBSITE}/thank-you/${search}`
                  if (res?.data?.transactionId) {
                    redirectURL = `${redirectURL}&transactionId=${res.data.transactionId}`
                  }
                  window.location.href = redirectURL
                }

                setLoading(false)
              })
            })
          } else {
            setLoading(false)
          }
        })
      })
    }
  }

  const payDispatch = obj => {
    const payFunc = isSubscription ? paySubscription : pay

    dispatch(payFunc(obj)).then(res => {
      if (res) {
        let redirectURL = `${BIRD_MARKETING_WEBSITE}/thank-you/${search}`
        if (res?.data?.transactionId) {
          redirectURL = `${redirectURL}&transactionId=${res.data.transactionId}`
        }
        window.location.href = redirectURL
      }

      setLoading(false)
    })
  }

  const onPay = async () => {
    if (!stripe || !elements) return

    setLoading(true)

    const cardElement = elements.getElement(CardElement)

    await stripe.createToken(cardElement).then(({ error, token }) => {
      if (error) return null

      const paymentData = {
        token: token.id,
        email: user.email,
        ...isSubscription ? { athletePlanId: program?.athletePlanId } : { program: alias },
        ...coupon ? { coupon } : {},
      }

      const form = refForm?.current?.props?.form

      if (form) {
        form.validateFields((err, values) => {
          if (err) return

          const dataUser = {
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            address: values.address,
            city: values.city,
            state: values.state,
            zip_code: values.zipCode,
            country: 'US',
            phone: prefix + phone,
          }

          dispatch(updateUser(user?.userId, dataUser)).then(res => {
            if (res) {
              payDispatch({ ...paymentData, email: values.email })
            }
          })
        })
      } else {
        payDispatch(paymentData)
      }
    })
  }

  const attrSignUp = {
    refForm,
    onSubmit: onFinishSignUp,
    cardError,
    onChangeValues,
    setCardError,
    setIsComplete,
    prefix,
    setPrefix,
  }

  const existingPlan = plan?.planId ? (
    <>
      <div className={[css.headTitle, css.wrapperExistingPlan].join(' ')}>
        <div className={css.title}>Existing Plan</div>
        <div className={css.existingPlanInfo}>
          You are already enrolled in <span className={css.planName}>{plan?.name}</span>.<br />
          You cannot be enrolled in more than one plan at a time.<br />
          Would you like to cancel your enrollment in {plan?.name} and continue checking out?
        </div>
        <Checkbox className={css.check} onChange={() => setCancelPlan(!cancelPlan)}>Yes, cancel my {plan?.name} enrollment.</Checkbox>
      </div>
    </>
  ) : null

  const forms = {
    [`/sign-up/${alias}`]: () => <FormSignUp {...attrSignUp} />,
    [`/sign-in/${alias}`]: () => <FormSignIn />,
    [`/${alias}`]: () => <FormSignUp {...attrSignUp} />,
  }

  const signInBtn = <span onClick={() => history.push({ pathname: `/sign-in/${alias}`, search })}>Sign In</span>
  const signUpBtn = <span onClick={() => history.push({ pathname: `/sign-up/${alias}`, search })}>Sign Up</span>

  const headTitle = pathname === `/sign-in/${alias}` ? 'Sign In' : 'Contact Information'

  const headLinks = {
    [`/sign-up/${alias}`]: () => <div className={css.titleLink}>Already have an account? {signInBtn}</div>,
    [`/sign-in/${alias}`]: () => <div className={css.titleLink}>Don't have an account? {signUpBtn}</div>,
    [`/${alias}`]: () => <span onClick={() => signOut()}>Sign Out</span>,
  }

  const recalculateProgramCosts = discount => {
    if (discount) {
      const total = Number((Number(program?.price) - Number(discount)).toFixed(2))
      setBonus(formatCurrencyToTwoDecimals(discount))
      setProgramTotal(formatCurrencyToTwoDecimals(total))
    }
  }

  const data = {
    service: {
      label: isSubscription ? 'Monthly Coaching' : program?.name,
      price: `$${program?.price}`,
    },
  }

  const breadcrumbPast = (
    <span className={css.breadcrumbPast}>
      <a href={urlMarketing}>Home</a>
      {isSubscription ? null : (
        <>
          &nbsp;/ <a href={urlAllTeams}>Teams</a> / <a href={`${urlAllTeams}/${alias}`}>{program?.name} </a>
        </>
      )}
    </span>
  )

  return (
    <section className={css.container}>
      <header className={css.header}>
        <div className={css.logoWrapper}>
          <img src={logo} alt='logo' className={css.logo} onClick={goBack} />
        </div>
      </header>
      <div className={css.wrapperMain}>
        <div className={css.left}>
          <div className={css.breadcrumbNav}>
            {breadcrumbPast} / Check Out
          </div>
          <div className={css.formWrapper}>
            <div className={[css.headTitle, css.flex, token && css.headTitleEdit].join(' ')}>
              <div className={css.title}>{headTitle}</div>
              {headLinks[pathname]?.()}
            </div>
            {forms[pathname]?.()}
            {existingPlan}
            <div className={css.bottomButtons}>
              <div className={css.btnBack} onClick={goBack}>&#60; Back to {isSubscription ? 'Bird' : program?.name}</div>
              <Button
                title='Pay now'
                customClass={css.btnSubmit}
                onClick={token ? onPay : onFinishSignUp}
                loading={loading}
                disabled={isDisabled || !isComplete || (token && !cancelPlan)}
              />
            </div>
          </div>
        </div>
        <div className={css.right}>
          <OrderCard data={data} coupon={coupon} totalPrice={bonus ? programTotal : program?.price} bonus={bonus}>
            <PromoCode setBonus={recalculateProgramCosts} coupon={coupon} setCoupon={setCoupon} />
          </OrderCard>
        </div>
      </div>
    </section>
  )
}

export default Main
