"use client";

import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useIntl } from "react-intl";

interface Complaint {
  id: string;
  title: string;
  regionalOffice: string;
  submissionDate: string;
  department: string;
  status: string;
}

const initialComplaints: Complaint[] = [
  {
    id: "C#23458",
    title: "Department of Urban Development",
    regionalOffice: "Karachi",
    submissionDate: "Mar 12, 2021",
    department: "Department of Urban Development",
    status: "Pending",
  },
  {
    id: "C#23459",
    title: "Provincial Transportation Authority",
    regionalOffice: "Hyderabad",
    submissionDate: "Jul 5, 2020",
    department: "Provincial Transportation",
    status: "Pending",
  },
  {
    id: "C#23460",
    title: "Bureau of Public Works",
    regionalOffice: "Sukkur",
    submissionDate: "Nov 23, 2019",
    department: "Bureau of Public Works",
    status: "Pending",
  },
  {
    id: "C#23461",
    title: "Office of Environmental Compliance",
    regionalOffice: "Larkana",
    submissionDate: "Mar 15, 2021",
    department: "Office of Environmental Compliance",
    status: "Pending",
  },
  {
    id: "C#23462",
    title: "Division of Infrastructure Planning",
    regionalOffice: "Nawabshah",
    submissionDate: "Aug 9, 2020",
    department: "Division of Infrastructure Planning",
    status: "Pending",
  },
  {
    id: "C#23463",
    title: "Department of Healthcare Services",
    regionalOffice: "Sukkur",
    submissionDate: "Jan 30, 2022",
    department: "Department of Healthcare Services",
    status: "Pending",
  },
  {
    id: "C#23464",
    title: "Bureau of Urban Development",
    regionalOffice: "Multan",
    submissionDate: "Apr 12, 2021",
    department: "Bureau of Urban Development",
    status: "Pending",
  },
  {
    id: "C#23465",
    title: "Environmental Protection Agency",
    regionalOffice: "Karachi",
    submissionDate: "Sep 18, 2020",
    department: "Agency for Community Services",
    status: "Pending",
  },
  {
    id: "C#23466",
    title: "Office of Energy Efficiency",
    regionalOffice: "Islamabad",
    submissionDate: "Dec 5, 2021",
    department: "Office of Cultural Affairs",
    status: "Pending",
  },
  {
    id: "C#23467",
    title: "Division of Renewable Resources",
    regionalOffice: "Lahore",
    submissionDate: "Feb 24, 2022",
    department: "Division of Workforce Development",
    status: "Pending",
  },
  {
    id: "C#23468",
    title: "Agency for Waste Management",
    regionalOffice: "Quetta",
    submissionDate: "Jun 10, 2021",
    department: "Department of Social Services",
    status: "Pending",
  },
  {
    id: "C#23469",
    title: "Department of Transportation",
    regionalOffice: "Peshawar",
    submissionDate: "Oct 14, 2020",
    department: "Bureau of Transportation",
    status: "Pending",
  },
  {
    id: "C#23470",
    title: "Bureau of Planning and Research",
    regionalOffice: "Faisalabad",
    submissionDate: "Jul 7, 2021",
    department: "Office of Housing and Urban Development",
    status: "Pending",
  },
  {
    id: "C#23471",
    title: "Division of Community Services",
    regionalOffice: "Rawalpindi",
    submissionDate: "May 21, 2020",
    department: "Division of Public Safety",
    status: "Pending",
  },
];

export default function ComplaintsList() {
  const [complaints] = useState<Complaint[]>(initialComplaints);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const intl = useIntl();

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      searchQuery === "" ||
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const paginatedComplaints = filteredComplaints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Overview</h2>
        <DateRangePicker
          dateRange={dateRange}
          onChange={setDateRange}
          className="w-[300px]"
        />
      </div>

      <div className="rounded-md border">
        <div className="p-4">
          <h2 className="text-lg font-semibold">All Complaints</h2>

          <div className="mt-4 flex justify-between items-center mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[250px] pl-9"
              />
            </div>
            <Button asChild>
              <Link href="/complaints/register">
                {intl.formatMessage({ id: "complaint.register" })}
              </Link>
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Complaint Title</TableHead>
                  <TableHead>Regional Office</TableHead>
                  <TableHead>Submission date</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedComplaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell>{complaint.id}</TableCell>
                    <TableCell>{complaint.title}</TableCell>
                    <TableCell>{complaint.regionalOffice}</TableCell>
                    <TableCell>{complaint.submissionDate}</TableCell>
                    <TableCell>{complaint.department}</TableCell>
                    <TableCell>
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-600">
                        {complaint.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Assign
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-pencil"
                          >
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          </svg>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-file"
                          >
                            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                          </svg>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between py-4">
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
