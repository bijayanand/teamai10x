'use client';
import React, { useState } from 'react';
import { Eye, Mail, Phone, Download, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

type LeadStatus = 'New' | 'Contacted' | 'In Progress' | 'Converted' | 'Closed';

interface Lead {
  id: string;
  name: string;
  org: string;
  orgType: string;
  mobile: string;
  email: string;
  service: string;
  budget: string;
  status: LeadStatus;
  date: string;
}

const leads: Lead[] = [
  { id: 'lead-001', name: 'Rajesh Kumar Verma', org: 'Sunrise Public School', orgType: 'School', mobile: '+91 98765 43210', email: 'principal@sunriseschool.edu', service: 'Website Development', budget: '₹10k–₹25k', status: 'New', date: '10 Sep 2026' },
  { id: 'lead-002', name: 'Dr. Priya Mishra', org: 'City Commerce College', orgType: 'College', mobile: '+91 87654 32109', email: 'director@citycommerce.ac.in', service: 'AI-Powered Website', budget: '₹25k–₹50k', status: 'Contacted', date: '10 Sep 2026' },
  { id: 'lead-003', name: 'Amit Singh Rawat', org: 'TechPath Coaching', orgType: 'Coaching', mobile: '+91 76543 21098', email: 'info@techpathcoaching.in', service: 'Complete Digital Package', budget: '₹50k–₹1L', status: 'In Progress', date: '09 Sep 2026' },
  { id: 'lead-004', name: 'Sunita Devi Sharma', org: 'Asha NGO Trust', orgType: 'NGO', mobile: '+91 65432 10987', email: 'contact@ashangtrust.org', service: 'Website Development', budget: '₹6,999', status: 'Converted', date: '08 Sep 2026' },
  { id: 'lead-005', name: 'Vikram Agarwal', org: 'Horizon Enterprises Pvt Ltd', orgType: 'Business', mobile: '+91 54321 09876', email: 'ceo@horizonenterprises.in', service: 'Social Media Management', budget: '₹25k–₹50k', status: 'New', date: '08 Sep 2026' },
  { id: 'lead-006', name: 'Meena Kumari Jha', org: 'BrightFuture Institute', orgType: 'Institution', mobile: '+91 43210 98765', email: 'admin@brightfuture.edu.in', service: 'AI-Powered Website', budget: '₹10k–₹25k', status: 'Contacted', date: '07 Sep 2026' },
  { id: 'lead-007', name: 'Rohit Sharma Gupta', org: 'SwiftLaunch Startup', orgType: 'Startup', mobile: '+91 32109 87654', email: 'founder@swiftlaunch.in', service: 'Digital Marketing', budget: '₹10k–₹25k', status: 'In Progress', date: '06 Sep 2026' },
  { id: 'lead-008', name: 'Kavita Singh Rathore', org: 'Green Meadows School', orgType: 'School', mobile: '+91 21098 76543', email: 'office@greenmeadows.edu', service: 'Website Development', budget: '₹6,999', status: 'New', date: '05 Sep 2026' },
];

const statusConfig: Record<LeadStatus, { label: string; cls: string }> = {
  New: { label: 'New', cls: 'bg-success-subtle text-success border border-success/20' },
  Contacted: { label: 'Contacted', cls: 'bg-info-subtle text-info border border-info/20' },
  'In Progress': { label: 'In Progress', cls: 'bg-warning-subtle text-warning border border-warning/20' },
  Converted: { label: 'Converted', cls: 'bg-purple-500/10 text-purple-400 border border-purple-500/20' },
  Closed: { label: 'Closed', cls: 'bg-admin-surface-2 text-admin-muted border border-admin' },
};

const allStatuses: LeadStatus[] = ['New', 'Contacted', 'In Progress', 'Converted', 'Closed'];

export default function RecentLeadsTable() {
  const [tableLeads, setTableLeads] = useState<Lead[]>(leads);
  const [openStatusId, setOpenStatusId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const updateStatus = (id: string, newStatus: LeadStatus) => {
    setTableLeads((prev) => prev.map((l) => l.id === id ? { ...l, status: newStatus } : l));
    setOpenStatusId(null);
    toast.success(`Lead status updated to ${newStatus}`);
  };

  const handleExport = () => {
    // Backend integration point: GET /api/leads/export?format=csv
    toast.success('CSV export started — file will download shortly');
  };

  const filtered = filterStatus === 'All' ? tableLeads : tableLeads.filter((l) => l.status === filterStatus);

  return (
    <div className="bg-admin-surface border border-admin rounded-2xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-b border-admin">
        <div>
          <h3 className="font-600 text-admin-text text-sm">Recent Enquiries</h3>
          <p className="text-xs text-admin-muted mt-0.5">{filtered.length} leads shown</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Filter chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {['All', ...allStatuses].map((s) => (
              <button
                key={`filter-chip-${s}`}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-500 transition-all duration-150 ${
                  filterStatus === s
                    ? 'bg-accent text-primary font-600' :'bg-admin-surface-2 text-admin-muted border border-admin hover:text-admin-text'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-500 text-admin-muted bg-admin-surface-2 border border-admin hover:text-admin-text transition-all duration-150 active:scale-95"
          >
            <Download size={13} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-admin">
              {['Name & Organization', 'Type', 'Contact', 'Service', 'Budget', 'Status', 'Date', 'Actions'].map((h) => (
                <th key={`th-lead-${h}`} className="text-left px-4 py-3 text-xs font-600 text-admin-muted uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-admin last:border-0 hover:bg-admin-surface-2 transition-colors duration-100 group"
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <p className="font-500 text-admin-text text-xs">{lead.name}</p>
                  <p className="text-2xs text-admin-muted mt-0.5 truncate max-w-[160px]">{lead.org}</p>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-xs text-admin-muted">{lead.orgType}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <p className="text-xs text-admin-muted">{lead.mobile}</p>
                  <p className="text-2xs text-admin-muted/70 truncate max-w-[140px]">{lead.email}</p>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-xs text-admin-text">{lead.service}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-xs text-admin-muted tabular">{lead.budget}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="relative">
                    <button
                      onClick={() => setOpenStatusId(openStatusId === lead.id ? null : lead.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-2xs font-600 ${statusConfig[lead.status].cls} cursor-pointer hover:opacity-80 transition-opacity duration-150`}
                    >
                      {statusConfig[lead.status].label}
                      <ChevronDown size={10} />
                    </button>
                    {openStatusId === lead.id && (
                      <div className="absolute top-full left-0 mt-1 w-36 bg-admin-surface border border-admin rounded-xl shadow-card-admin z-20 py-1 animate-fade-in">
                        {allStatuses.map((s) => (
                          <button
                            key={`status-opt-${lead.id}-${s}`}
                            onClick={() => updateStatus(lead.id, s)}
                            className={`w-full text-left px-3 py-2 text-xs hover:bg-admin-surface-2 transition-colors duration-100 ${lead.status === s ? 'font-600 text-accent' : 'text-admin-text'}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-xs text-admin-muted">{lead.date}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <button
                      title="View lead details"
                      className="p-1.5 rounded-lg text-admin-muted hover:bg-info-subtle hover:text-info transition-all duration-150"
                    >
                      <Eye size={14} />
                    </button>
                    <a
                      href={`mailto:${lead.email}`}
                      title="Send email"
                      className="p-1.5 rounded-lg text-admin-muted hover:bg-success-subtle hover:text-success transition-all duration-150"
                    >
                      <Mail size={14} />
                    </a>
                    <a
                      href={`tel:${lead.mobile}`}
                      title="Call lead"
                      className="p-1.5 rounded-lg text-admin-muted hover:bg-warning-subtle hover:text-warning transition-all duration-150"
                    >
                      <Phone size={14} />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-5 py-3 border-t border-admin">
        <p className="text-xs text-admin-muted">Showing {filtered.length} of {tableLeads.length} enquiries</p>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((p) => (
            <button
              key={`page-${p}`}
              className={`w-7 h-7 rounded-lg text-xs font-500 transition-all duration-150 ${p === 1 ? 'bg-accent text-primary font-600' : 'text-admin-muted hover:bg-admin-surface-2'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}