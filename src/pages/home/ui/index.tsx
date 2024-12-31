'use client';

import ProjectsDropdownMenu from './projects-dropdown-menu';
//import { useFetchEventListQuery } from '../api/queries';

export const HomePage = () => {
  // const { data } = useFetchEventListQuery();
  // console.log(data);
  return (
    <div className="h-screen flex flex-col">
      <div className="p-5 flex gap-2">
        <ProjectsDropdownMenu />
      </div>
    </div>
  );
};
