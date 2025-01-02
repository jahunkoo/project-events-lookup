import { ProjectsDropdownMenu } from './projects-dropdown-menu';
import { EventsTable } from './events-table';
import { PeriodButtonGroup } from './period-button-group';
import { Pagination } from './pagination';

export const HomePage = () => {
  return (
    <div className="h-screen p-5 flex flex-col justify-between gap-5">
      <div className="basis-10 flex gap-4 items-center">
        <ProjectsDropdownMenu />
        <PeriodButtonGroup />
      </div>
      <div className="overflow-y-auto flex-auto">
        <EventsTable />
      </div>
      <div className="basis-10 flex justify-center">
        <Pagination />
      </div>
    </div>
  );
};
