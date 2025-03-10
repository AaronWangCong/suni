// @ts-nocheck: 暂时忽略js 后期对应的组件都改为ts
/**
 * 此文件的作用为统一配置所有组件的props参数
 * 借此用户可以全局覆盖组件的props默认值
 * 无需在每个引入组件的页面中都配置一次
 */
import config from './config'

import ActionSheet from '../../components/su-action-sheet/actionSheet'
import Album from '../../components/su-album/album'
import Alert from '../../components/su-alert/alert'
import Avatar from '../../components/su-avatar/avatar'
import AvatarGroup from '../../components/su-avatar-group/avatarGroup'
import Backtop from '../../components/su-back-top/backtop'
import Badge from '../../components/su-badge/badge'
import Button from '../../components/su-button/button'
import Calendar from '../../components/su-calendar/calendar'
import CarKeyboard from '../../components/su-car-keyboard/carKeyboard'
import Cell from '../../components/su-cell/cell'
import CellGroup from '../../components/su-cell-group/cellGroup'
import Checkbox from '../../components/su-checkbox/checkbox'
import CheckboxGroup from '../../components/su-checkbox-group/checkboxGroup'
import CircleProgress from '../../components/su-circle-progress/circleProgress'
import Code from '../../components/su-code/code'
import CodeInput from '../../components/su-code-input/codeInput'
import Col from '../../components/su-col/col'
import Collapse from '../../components/su-collapse/collapse'
import CollapseItem from '../../components/su-collapse-item/collapseItem'
import ColumnNotice from '../../components/su-column-notice/columnNotice'
import CountDown from '../../components/su-count-down/countDown'
import CountTo from '../../components/su-count-to/countTo'
import DatetimePicker from '../../components/su-datetime-picker/datetimePicker'
import Divider from '../../components/su-divider/divider'
import Empty from '../../components/su-empty/empty'
import Form from '../../components/su-form/form'
import GormItem from '../../components/su-form-item/formItem'
import Gap from '../../components/su-gap/gap'
import Grid from '../../components/su-grid/grid'
import GridItem from '../../components/su-grid-item/gridItem'
import Icon from '../../components/su-icon/icon'
import Image from '../../components/su-image/image'
import IndexAnchor from '../../components/su-index-anchor/indexAnchor'
import IndexList from '../../components/su-index-list/indexList'
import Input from '../../components/su-input/input'
import Keyboard from '../../components/su-keyboard/keyboard'
import Line from '../../components/su-line/line'
import LineProgress from '../../components/su-line-progress/lineProgress'
import Link from '../../components/su-link/link'
import List from '../../components/su-list/list'
import ListItem from '../../components/su-list-item/listItem'
import LoadingIcon from '../../components/su-loading-icon/loadingIcon'
import LoadingPage from '../../components/su-loading-page/loadingPage'
import Loadmore from '../../components/su-loadmore/loadmore'
import Modal from '../../components/su-modal/modal'
import Navbar from '../../components/su-navbar/navbar'
import NoNetwork from '../../components/su-no-network/noNetwork'
import NoticeBar from '../../components/su-notice-bar/noticeBar'
import Notify from '../../components/su-notify/notify'
import NumberBox from '../../components/su-number-box/numberBox'
import NumberKeyboard from '../../components/su-number-keyboard/numberKeyboard'
import Overlay from '../../components/su-overlay/overlay'
import Parse from '../../components/su-parse/parse'
import Picker from '../../components/su-picker/picker'
import Popup from '../../components/su-popup/popup'
import Radio from '../../components/su-radio/radio'
import RadioGroup from '../../components/su-radio-group/radioGroup'
import Rate from '../../components/su-rate/rate'
import ReadMore from '../../components/su-read-more/readMore'
import Row from '../../components/su-row/row'
import RowNotice from '../../components/su-row-notice/rowNotice'
import ScrollList from '../../components/su-scroll-list/scrollList'
import Search from '../../components/su-search/search'
import Section from '../../components/su-section/section'
import Skeleton from '../../components/su-skeleton/skeleton'
import Slider from '../../components/su-slider/slider'
import StatusBar from '../../components/su-status-bar/statusBar'
import Steps from '../../components/su-steps/steps'
import StepsItem from '../../components/su-steps-item/stepsItem'
import Sticky from '../../components/su-sticky/sticky'
import Subsection from '../../components/su-subsection/subsection'
import SwipeAction from '../../components/su-swipe-action/swipeAction'
import SwipeActionItem from '../../components/su-swipe-action-item/swipeActionItem'
import Swiper from '../../components/su-swiper/swiper'
import SwipterIndicator from '../../components/su-swiper-indicator/swipterIndicator'
import Switch from '../../components/su-switch/switch'
import Tabbar from '../../components/su-tabbar/tabbar'
import TabbarItem from '../../components/su-tabbar-item/tabbarItem'
import Tabs from '../../components/su-tabs/tabs'
import Tag from '../../components/su-tag/tag'
import Text from '../../components/su-text/text'
import Textarea from '../../components/su-textarea/textarea'
import Toast from '../../components/su-toast/toast'
import Toolbar from '../../components/su-toolbar/toolbar'
import Tooltip from '../../components/su-tooltip/tooltip'
import Transition from '../../components/su-transition/transition'
import Upload from '../../components/su-upload/upload'
import Copy from '../../components/su-copy/copy'
import Dropdown from '../../components/su-dropdown/dropdown'
import DropdownItem from '../../components/su-dropdown-item/dropdownItem'

import Drawer from '../../components/su-drawer/drawer'
import Select from '../../components/su-select/select'
import CellInput from '../../components/su-cell-input/cellInput'
import Card from '../../components/su-card/card'
import ApiList from '../../components/su-api-list/apiList'
import ImagePreview from '../../components/su-image-preview/imagePreview'
import ReadonlyWrapper from '../../components/su-readonly-wrapper/readonlyWrapper'
import FormCheckbox from '../../components/su-form-checkbox/formCheckbox'
import FormRadio from '../../components/su-form-radio/formRadio'

const { color } = config

export default {
  ...ActionSheet,
  ...Album,
  ...Alert,
  ...Avatar,
  ...AvatarGroup,
  ...Backtop,
  ...Badge,
  ...Button,
  ...Calendar,
  ...CarKeyboard,
  ...Cell,
  ...CellGroup,
  ...Checkbox,
  ...CheckboxGroup,
  ...CircleProgress,
  ...Code,
  ...CodeInput,
  ...Col,
  ...Collapse,
  ...CollapseItem,
  ...ColumnNotice,
  ...CountDown,
  ...CountTo,
  ...DatetimePicker,
  ...Divider,
  ...Empty,
  ...Form,
  ...GormItem,
  ...Gap,
  ...Grid,
  ...GridItem,
  ...Icon,
  ...Image,
  ...IndexAnchor,
  ...IndexList,
  ...Input,
  ...Keyboard,
  ...Line,
  ...LineProgress,
  ...Link,
  ...List,
  ...ListItem,
  ...LoadingIcon,
  ...LoadingPage,
  ...Loadmore,
  ...Modal,
  ...Navbar,
  ...NoNetwork,
  ...NoticeBar,
  ...Notify,
  ...NumberBox,
  ...NumberKeyboard,
  ...Overlay,
  ...Parse,
  ...Picker,
  ...Popup,
  ...Radio,
  ...RadioGroup,
  ...Rate,
  ...ReadMore,
  ...Row,
  ...RowNotice,
  ...ScrollList,
  ...Search,
  ...Section,
  ...Skeleton,
  ...Slider,
  ...StatusBar,
  ...Steps,
  ...StepsItem,
  ...Sticky,
  ...Subsection,
  ...SwipeAction,
  ...SwipeActionItem,
  ...Swiper,
  ...SwipterIndicator,
  ...Switch,
  ...Tabbar,
  ...TabbarItem,
  ...Tabs,
  ...Tag,
  ...Text,
  ...Textarea,
  ...Toast,
  ...Toolbar,
  ...Tooltip,
  ...Transition,
  ...Upload,
  ...Drawer,
  ...Select,
  ...CellInput,
  ...Card,
  ...ApiList,
  ...ImagePreview,
  ...ReadonlyWrapper,
  ...FormCheckbox,
  ...FormRadio,
  ...Copy,
  ...Dropdown,
  ...DropdownItem,
}
