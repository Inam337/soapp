import { CommonIconNames, IconType } from "./types";
import { HomeIcon } from "./home.icon";
import { MenuIcon } from "./menu.icon";
import { ArrowChevronRightIcon } from "./arrow-chevron-right.icon";
import { BarChartIcon } from "./bar-chart.icon";
import { CalenderIcon } from "./calender.icon";
import { CheckboxIcon } from "./checkbox.icon";
import { CheckMarkIcon } from "./checkmark.icon";
import { ClockIcon } from "./clock.icon";
import { CogIcon } from "./cog.icon";
import { DashboardIcon } from "./dashboard.icon";
import { DataIcon } from "./data.icon";
import { DownloadIcon } from "./download.icon";
import { EditIcon } from "./edit.icon";
import { FeedbackIcon } from "./feedback.icon";
import { FileIcon } from "./file.icon";
import { FiltersIcon } from "./filters.icon";
import { LanguageIcon } from "./language.icon";
import { LogoutIcon } from "./logout.icon";
import { NotificationIcon } from "./notification.icon";
import { OverDueIcon } from "./overdue.icon";
import { ReportIcon } from "./report.icon";
import { ResolutionIcon } from "./resolution.icon";
import { SearchIcon } from "./search.icon";
import { SuspendIcon } from "./suspend.icon";
import { UserIcon } from "./user.icon";
import { UsersIcon } from "./users.icon";
import { ViewIcon } from "./view.icon";

const iconComponents = {
  [CommonIconNames.HOME_ICON]: HomeIcon,
  [CommonIconNames.ORDERS_ICON]: HomeIcon,
  [CommonIconNames.PRODUCTS_ICON]: HomeIcon,
  [CommonIconNames.CATEGORIES_ICON]: HomeIcon,
  [CommonIconNames.STOCK_ICON]: HomeIcon,
  [CommonIconNames.REPORTS_ICON]: ReportIcon,
  [CommonIconNames.MENU_ICON]: MenuIcon,
  [CommonIconNames.ARROW_RIGHT_ICON]: ArrowChevronRightIcon,
  [CommonIconNames.BAR_CHART_ICON]: BarChartIcon,
  [CommonIconNames.CALENDER_ICON]: CalenderIcon,
  [CommonIconNames.CHECKBOX_ICON]: CheckboxIcon,
  [CommonIconNames.CHECK_MARK_ICON]: CheckMarkIcon,
  [CommonIconNames.CLOCK_ICON]: ClockIcon,
  [CommonIconNames.COG_ICON]: CogIcon,
  [CommonIconNames.DASHBOARD_ICON]: DashboardIcon,
  [CommonIconNames.DATA_ICON]: DataIcon,
  [CommonIconNames.DOWNLOAD_ICON]: DownloadIcon,
  [CommonIconNames.EDIT_ICON]: EditIcon,
  [CommonIconNames.FEEDBACK_ICON]: FeedbackIcon,
  [CommonIconNames.FILE_ICON]: FileIcon,
  [CommonIconNames.FILTERS_ICON]: FiltersIcon,
  [CommonIconNames.LANGUAGE_ICON]: LanguageIcon,
  [CommonIconNames.LOGOUT_ICON]: LogoutIcon,
  [CommonIconNames.NOTIFICATION_ICON]: NotificationIcon,
  [CommonIconNames.OVERDUE_ICON]: OverDueIcon,
  [CommonIconNames.REPORT_ICON]: ReportIcon,
  [CommonIconNames.RESOLUTION_ICON]: ResolutionIcon,
  [CommonIconNames.SEARCH_ICON]: SearchIcon,
  [CommonIconNames.SUSPEND_ICON]: SuspendIcon,
  [CommonIconNames.USER_ICON]: UserIcon,
  [CommonIconNames.USERS_ICON]: UsersIcon,
  [CommonIconNames.VIEW_ICON]: ViewIcon,
};

interface CommonIconProps extends IconType {
  name: CommonIconNames;
}

export const CommonIcon: React.FC<CommonIconProps> = ({ name, ...props }) => {
  const IconComponent = iconComponents[name];
  return IconComponent ? <IconComponent {...props} /> : null;
};
