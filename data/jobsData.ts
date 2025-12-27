import { Briefcase, MapPin } from 'lucide-react';

export interface Job {
    id: string;
    titleKey: string;
    typeKey: string;
    locationKey: string;
    descKey: string;
    fullDescKey: string;
    requirementsKey: string;
    benefitsKey: string;
}

export const jobsData: Job[] = [
    {
        id: 'senior-react-developer',
        titleKey: 'jobs.react_title',
        typeKey: 'jobs.type_full',
        locationKey: 'jobs.loc_remote',
        descKey: 'jobs.react_desc_short',
        fullDescKey: 'jobs.react_desc_full',
        requirementsKey: 'jobs.react_req',
        benefitsKey: 'jobs.react_ben'
    },
    {
        id: 'fullstack-net-developer',
        titleKey: 'jobs.net_title',
        typeKey: 'jobs.type_full',
        locationKey: 'jobs.loc_office',
        descKey: 'jobs.net_desc_short',
        fullDescKey: 'jobs.net_desc_full',
        requirementsKey: 'jobs.net_req',
        benefitsKey: 'jobs.net_ben'
    },
    {
        id: 'hr-specialist',
        titleKey: 'jobs.hr_title',
        typeKey: 'jobs.type_full',
        locationKey: 'jobs.loc_office',
        descKey: 'jobs.hr_desc_short',
        fullDescKey: 'jobs.hr_desc_full',
        requirementsKey: 'jobs.hr_req',
        benefitsKey: 'jobs.hr_ben'
    }
];
