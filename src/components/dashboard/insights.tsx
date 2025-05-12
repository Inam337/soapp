import React, { FC } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import AvgResponseChart from "../charts/average-response-time.chart";
import DistrictStatsChart from "../charts/stats-by-district.chart";
import { CommonIcon } from "@/common/icons";
import { CommonIconNames, IconColors } from "@/common/icons/types";
import StatsCard from "@/components/common/StatsCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

// Main Dashboard Component
const DashboardComponent: FC = () => {
  const ICON_SIZE = 20;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatsCard
              title="Total Complaints"
              value="7.5k"
              icon={
                <CommonIcon
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  name={CommonIconNames.FILE_ICON}
                  fill={IconColors.PRIMARY_COLOR_ICON}
                />
              }
            />
            <StatsCard
              title="Resolved"
              value="120"
              icon={
                <CommonIcon
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  name={CommonIconNames.CHECK_MARK_ICON}
                  fill={IconColors.PRIMARY_COLOR_ICON}
                />
              }
            />
            <StatsCard
              title="New Complaints Today"
              value="24"
              icon={
                <CommonIcon
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  name={CommonIconNames.NOTIFICATION_ICON}
                  fill={IconColors.PRIMARY_COLOR_ICON}
                />
              }
            />
            <StatsCard
              title="Overdue Complaints"
              value="2.4k"
              icon={
                <CommonIcon
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  name={CommonIconNames.OVERDUE_ICON}
                  fill={IconColors.PRIMARY_COLOR_ICON}
                />
              }
            />
            <StatsCard
              title="Pending Escalations"
              value="120"
              icon={
                <CommonIcon
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  name={CommonIconNames.CLOCK_ICON}
                  fill={IconColors.PRIMARY_COLOR_ICON}
                />
              }
            />
            <StatsCard
              title="Avg. Resolution Time"
              value="2.3 Days"
              icon={
                <CommonIcon
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  name={CommonIconNames.BAR_CHART_ICON}
                  fill={IconColors.PRIMARY_COLOR_ICON}
                />
              }
            />
          </div>
        </div>
        <div className="col-span-1 rounded-xl shadow-sm p-4">
          <h3 className="text-lg font-semibold">Average Response Time</h3>
          <p className="text-sm text-gray-500">Top 5 Districts</p>
          <AvgResponseChart />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-1 p-4 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold">Stats Districts Chart</h3>
        <p className="text-sm text-gray-500">Top 5 Districts</p>
        <DistrictStatsChart />
      </div>
    </div>
  );
};

export default DashboardComponent;
