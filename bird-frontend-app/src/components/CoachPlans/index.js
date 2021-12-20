import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'components/CustomButton'
import { Skeleton } from 'antd'
import css from './index.less'
import c from 'classnames'
import { ArrowRightOutlined } from '@ant-design/icons'
import { fetchSubscriptionsForCoaches } from 'modules/subscriptions/subscriptions-actions'

const Block = ({ item: { name, maxTemplates, maxAthletes, description, price, options = [], coachPlanId, loading }, activeId, onFinish }) => (
  <div className={c(css.wrapperBlock, { [css.wrapperRecommendBlock]: coachPlanId === 2 })}>
    {loading
      ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      )
      : (
        <>
          <div className={c(css.title, { [css.recommendTitle]: coachPlanId === 2 })}>{name}</div>
          <div className={css.description}>{description}</div>
          <div className={css.wrapperPrice}>
            <p className={css.dollarSign}>$</p>
            <p className={css.price}>{parseInt(price)}</p>
            <p className={css.monthlyPrice}>/ mo</p>
          </div>
          <ul className={css.options}>
            <p className={css.optionsTitle}>Plan includes</p>
            {([[`Up to ${maxAthletes} athletes`], ...options])
              .map(i =>
                <li key={i}>
                  <img src='/img/checkmark_plans.svg' className={css.checkMarkPlans} />
                  <div className={css.eachOption}>{i}</div>
                </li>)}
          </ul>
          <div className={css.wrapperFooter}>
            {+coachPlanId === +activeId ? (
              <div className={css.wrapperActivePlan}>Selected plan</div>
            )
              : (
                <Button
                  size={Button.SIZE_LARGE}
                  face={Button.FACE_PRIMARY}
                  className={c(css.buttonCoachPlan, { [css.recommendbutton]: coachPlanId === 2 })}
                  onClick={() => onFinish(coachPlanId)}
                >
                  CHOOSE
                  <ArrowRightOutlined style={{ fontSize: '20px', backgroundColor: '#f0d603', padding: '10px', borderRadius: '25%' }} />
                </Button>
              )}
          </div>
        </>
      )}
  </div>
)

const loaderSub = [{ loading: true }, { loading: true }, { loading: true }]

const CoachPlans = ({ onFinish = () => { }, activeId }) => {
  const { coachPlans } = useSelector(({ subscriptions }) => subscriptions)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSubscriptionsForCoaches())
  }, [])

  const subscriptions = coachPlans.length ? coachPlans : loaderSub

  return (
    <div className={css.wrapperCoachPlans}>
      {subscriptions.map((i, ind) => <Block key={ind} item={i} activeId={activeId} onFinish={onFinish} />)}
    </div>
  )
}

export default CoachPlans
