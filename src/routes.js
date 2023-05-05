import React from 'react';

const EmployeeRegistration = React.lazy(() => import('./views/employee-management/employee-registration/EmployeeRegistrationIndex'));
const EmployeeList = React.lazy(() => import('./views/employee-management/employee-list/EmployeeListIndex'));
const AdminRegAndList  = React.lazy(() => import('./views/admin-management/admin-reg-list/adminRegandList'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const EmployeeDetail = React.lazy(() => import('./views/employee-management/employee-list/EmployeeDetail'));
const JapaneseSkill = React.lazy(() => import('./views/dashboard/japaneseskill'));
const EngSkill = React.lazy(() => import('./views/dashboard/engskill'));



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/employee-management', name: 'Employee Management',exact: true },
  { path: '/employee-management/employee-register', name: 'Employee Registration', component: EmployeeRegistration },
  { path: '/employee-management/employee-list', name: 'Employee List', component: EmployeeList },
  { path: '/admin-management/admin-reg-list', name: 'Admin Reg List', component: AdminRegAndList },
  { path: '/employee-management/employee-detail', name: 'Employee Detail', component: EmployeeDetail },
  { path: '/japaneseskill', name: 'Japaneseskill', component: JapaneseSkill },
  { path: '/engskill', name: 'Engskill', component: EngSkill },
];

export default routes;
