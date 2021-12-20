import { createElement } from 'react'
import Arrow from './Arrow'
import ArrowWoStem from './ArrowWoStem'
import Article from './Article'
import Asset from './Asset'
import Basket from './Basket'
import Bookmark from './Bookmark'
import BookmarkFill from './BookmarkFill'
import Close from './Close'
import Community from './Community'
import Course from './Course'
import Crisis from './Crisis'
import CustomersAttraction from './CustomersAttraction'
import CustomersService from './CustomersService'
import Denied from './Denied'
import Development from './Development'
import Doc from './Doc'
import Dropdown from './Dropdown'
import Edit from './Edit'
import EditCustom from './EditCustom'
import UploadCustom from './UploadCustom'
import Efficiency from './Efficiency'
import Email from './Email'
import EmailFill from './EmailFill'
import Event from './Event'
import Facebook from './Facebook'
import FacebookFrame from './FacebookFrame'
import Feed from './Feed'
import Finance from './Finance'
import Fullscreen from './Fullscreen'
import G from './G'
import Linkedin from './Linkedin'
import Information from './Information'
import Inspiration from './Inspiration'
import Jpg from './Jpg'
import Law from './Law'
import Logo from './Logo'
import Lock from './Lock'
import Copy from './Copy'
import Management from './Management'
import NewTab from './NewTab'
import Notebook from './Notebook'
import Odnoklassniki from './Odnoklassniki'
import Ok from './Ok'
import Pause from './Pause'
import Pdf from './Pdf'
import Phone from './Phone'
import Play from './Play'
import Podcast from './Podcast'
import Post from './Post'
import Refresh from './Refresh'
import Risks from './Risks'
import Search from './Search'
import UserSearch from './UserSearch'
import Seervice from './Seervice'
import Settings from './Settings'
import SignIn from './SignIn'
import SoundOff from './SoundOff'
import SoundOn from './SoundOn'
import Staff from './Staff'
import Star from './Star'
import StartBusiness from './StartBusiness'
import SlickLeftArrow from './SlickLeftArrow'
import SlickRightArrow from './SlickRightArrow'
import LebedevLogo from './LebedevLogo'
import Test from './Test'
import Time from './Time'
import Trainer from './Trainer'
import Trajectory from './Trajectory'
import Twitter from './Twitter'
import Video from './Video'
import Vk from './Vk'
import Wait from './Wait'
import Xls from './Xls'
import Tick from './Tick'
import RateStar from './RateStar'
import Tag from './Tag'
import Dots from './Dots'
import Message from './Message'
import ArrowDown from './ArrowDown'
import ArrowLeft from './ArrowLeft'
import Eye from './Eye'
import EyeClosed from './EyeClosed'
import Undo from './Undo'
import CustomDashboard from './CustomDashboard'
import CustomUsers from './CustomUsers'
import CustomProfile from './CustomProfile'
import CustomList from './CustomList'

export const iconsList = {
  email: Email,
  emailFill: EmailFill,
  logo: Logo,
  basket: Basket,
  bookmark: Bookmark,
  bookmarkFill: BookmarkFill,
  search: Search,
  userSearch: UserSearch,
  information: Information,
  inspiration: Inspiration,
  startBusiness: StartBusiness,
  management: Management,
  staff: Staff,
  finance: Finance,
  customersAttraction: CustomersAttraction,
  customerService: CustomersService,
  efficiency: Efficiency,
  risks: Risks,
  law: Law,
  lock: Lock,
  copy: Copy,
  development: Development,
  crisis: Crisis,
  feed: Feed,
  time: Time,
  trajectory: Trajectory,
  video: Video,
  course: Course,
  seervice: Seervice,
  settings: Settings,
  signIn: SignIn,
  community: Community,
  event: Event,
  article: Article,
  podcast: Podcast,
  test: Test,
  trainer: Trainer,
  play: Play,
  pause: Pause,
  post: Post,
  soundOn: SoundOn,
  soundOff: SoundOff,
  fullScreen: Fullscreen,
  star: Star,
  ok: Ok,
  facebook: Facebook,
  facebookFrame: FacebookFrame,
  twitter: Twitter,
  vk: Vk,
  odnoklassniki: Odnoklassniki,
  google: G,
  linkedin: Linkedin,
  doc: Doc,
  pdf: Pdf,
  xls: Xls,
  jpg: Jpg,
  arrow: Arrow,
  arrowDown: ArrowDown,
  arrowLeft: ArrowLeft,
  arrowWoStem: ArrowWoStem,
  newtab: NewTab,
  refresh: Refresh,
  edit: Edit,
  editCustom: EditCustom,
  uploadCustom: UploadCustom,
  close: Close,
  dropdown: Dropdown,
  notebook: Notebook,
  phone: Phone,
  wait: Wait,
  denied: Denied,
  slickLeftArrow: SlickLeftArrow,
  slickRightArrow: SlickRightArrow,
  lebedevLogo: LebedevLogo,
  tick: Tick,
  rateStar: RateStar,
  tag: Tag,
  dots: Dots,
  message: Message,
  asset: Asset,
  eye: Eye,
  eyeClosed: EyeClosed,
  undo: Undo,
  customDashboard: CustomDashboard,
  customUsers: CustomUsers,
  customProfile: CustomProfile,
  customList: CustomList,
}

export function getIcon ({ type, ...props }) {
  if (!type) {
    return null
  }

  const svg = iconsList[type]

  if (!svg) {
    // eslint-disable-next-line no-console
    console.error(`Requested unknown icon '${type}'`)
    return null
  }

  return createElement(svg, { ...props })
}
