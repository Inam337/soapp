import { memo } from "react";
import { CommonIconNames, IconProps } from "./types";
import { HomeIcon } from "./home.icon";
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
import { WorldIcon } from "./world.icon";
import { ArrowDownIcon } from "./arrow-down.icon";
export const CommonIcon: React.FC<IconProps> = memo((props) => {
  const { name } = props;

  switch (name) {
    case CommonIconNames.HOME_ICON:
      return <HomeIcon {...props} />;
    case CommonIconNames.BAR_CHART_ICON:
      return <BarChartIcon {...props} />;
    case CommonIconNames.CALENDER_ICON:
      return <CalenderIcon {...props} />;
    case CommonIconNames.CHECKBOX_ICON:
      return <CheckboxIcon {...props} />;
    case CommonIconNames.CHECK_MARK_ICON:
      return <CheckMarkIcon {...props} />;
    case CommonIconNames.CLOCK_ICON:
      return <ClockIcon {...props} />;
    case CommonIconNames.COG_ICON:
      return <CogIcon {...props} />;
    case CommonIconNames.DASHBOARD_ICON:
      return <DashboardIcon {...props} />;
    case CommonIconNames.DOWNLOAD_ICON:
      return <DownloadIcon {...props} />;
    case CommonIconNames.EDIT_ICON:
      return <EditIcon {...props} />;
    case CommonIconNames.DATA_ICON:
      return <DataIcon {...props} />;
    case CommonIconNames.FEEDBACK_ICON:
      return <FeedbackIcon {...props} />;
    case CommonIconNames.FILE_ICON:
      return <FileIcon {...props} />;
    case CommonIconNames.FILTERS_ICON:
      return <FiltersIcon {...props} />;
    case CommonIconNames.LANGUAGE_ICON:
      return <LanguageIcon {...props} />;
    case CommonIconNames.LOGOUT_ICON:
      return <LogoutIcon {...props} />;
    case CommonIconNames.NOTIFICATION_ICON:
      return <NotificationIcon {...props} />;
    case CommonIconNames.OVERDUE_ICON:
      return <OverDueIcon {...props} />;
    case CommonIconNames.REPORT_ICON:
      return <ReportIcon {...props} />;
    case CommonIconNames.RESOLUTION_ICON:
      return <ResolutionIcon {...props} />;
    case CommonIconNames.SEARCH_ICON:
      return <SearchIcon {...props} />;
    case CommonIconNames.SUSPEND_ICON:
      return <SuspendIcon {...props} />;
    case CommonIconNames.USER_ICON:
      return <UserIcon {...props} />;
    case CommonIconNames.USERS_ICON:
      return <UsersIcon {...props} />;
    case CommonIconNames.VIEW_ICON:
      return <ViewIcon {...props} />;
    case CommonIconNames.WORLD_ICON:
      return <WorldIcon {...props} />;
    case CommonIconNames.ARROW_DOWN_ICON:
      return <ArrowDownIcon {...props} />;
    default:
      return null;
  }
});
