import { router } from '@inertiajs/core';
import { Link, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React, { PropsWithChildren, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import ApplicationMark from '@/Components/ApplicationMark';
import Banner from '@/Components/Banner';
import Dropdown from '@/Components/Dropdown';
import DropdownLink from '@/Components/DropdownLink';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Team } from '@/types';

interface Props {
  title: string;
  renderHeader?(): JSX.Element;
}

export default function AppLayout({
  title,
  renderHeader,
  children,
}: PropsWithChildren<Props>) {
  const page = useTypedPage();
  const route = useRoute();
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  function switchToTeam(e: React.FormEvent, team: Team) {
    e.preventDefault();
    router.put(
      route('current-team.update'),
      {
        team_id: team.id,
      },
      {
        preserveState: false,
      },
    );
  }

  function logout(e: React.FormEvent) {
    e.preventDefault();
    router.post(route('logout'));
  }

  return (
    <>
      <Head title={title} />

      {/* <Banner /> */}

      <header className="bg-theme-30 dark:bg-theme-800 h-16 fixed w-full z-20">
        <nav className="flex h-16 items-center justify-between md:pr-8 pr-4">
          <div className="flex h-full items-center">
            <button className="lg:hidden ml-6 p-1" id="mobile-menu-open">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 inline"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            <div className="border-theme-40 dark:border-theme-500 flex gap-1 h-full items-center lg:bg-white lg:border-r-2 lg:dark:bg-theme-600 lg:w-[250px] pl-3 pr-4">
              <div className="relative inline-block text-left">
                <Link
                  href={route('dashboard')}
                  className="flex items-center rounded"
                >
                  <ApplicationMark className="block h-7 w-auto" />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className="relative inline-block text-left"
              data-controller="dropdown"
            >
              <div>
                <Dropdown
                  align="right"
                  width="48"
                  renderTrigger={() =>
                    page.props.jetstream.managesProfilePhotos ? (
                      <button className="flex text-sm border-2 border-transparent rounded focus:outline-none focus:border-gray-300 transition">
                        <img
                          className="h-8 w-8 rounded-full object-cover"
                          src={page.props.auth.user?.profile_photo_url}
                          alt={page.props.auth.user?.name}
                        />
                      </button>
                    ) : (
                      <span className="inline-flex rounded">
                        <button
                          type="button"
                          className="inline-flex items-center space-x-2 font-semibold justify-center w-full px-3.5 py-2.5 rounded hover:bg-theme-50 dark:hover:bg-theme-600 transition"
                        >
                          <span>{page.props.auth.user?.name}</span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </button>
                      </span>
                    )
                  }
                >
                  {/* <!-- Account Management --> */}
                  <DropdownLink href={route('profile.show')}>
                    Profile
                  </DropdownLink>

                  {page.props.jetstream.hasApiFeatures ? (
                    <DropdownLink href={route('api-tokens.index')}>
                      API Tokens
                    </DropdownLink>
                  ) : null}

                  {/* <!-- Authentication --> */}
                  <form onSubmit={logout}>
                    <DropdownLink as="button">Log Out</DropdownLink>
                  </form>
                </Dropdown>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="h-16"></div>
      <div className="min-h-full -mt-16 pt-16 relative">
        <aside className="h-full" data-controller="menu">
          <div
            className="bg-black/10 fixed hidden inset-0 lg:hidden opacity-0 z-30"
            id="mobile-menu-overlay"
          ></div>
          <div
            className="bg-white border-theme-40 border-r-2 dark:bg-theme-600 dark:border-theme-500 fixed flex-col h-full hidden left-0 lg:flex lg:left-auto lg:top-auto overflow-y-auto px-3 text-theme-800 top-0 w-[250px] z-40"
            id="mobile-menu"
          >
            <div className="h-full flex flex-col">
              <div className="my-3 lg:hidden flex justify-between items-center">
                <a
                  className="border-theme-40 dark:border-theme-500 flex items-center lg:bg-white lg:border-r-2 lg:dark:bg-theme-600 lg:w-[250px] mb-[-3px] mt-[-3px] px-1"
                  href="#"
                >
                  A
                </a>
              </div>
              <div className="pt-2 flex-grow flex flex-col dark:text-white">
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <NavLink
                      href={route('dashboard')}
                      active={route().current('dashboard')}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                      </svg>
                      <span>Dashboard</span>
                    </NavLink>
                    <NavLink
                      href={route('teams.create')}
                      active={route().current('teams.create')}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm2-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm1 .5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
                        <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2Zm12 1a1 1 0 0 1 1 1v2H1V3a1 1 0 0 1 1-1h12ZM1 13V6h6.5v8H2a1 1 0 0 1-1-1Zm7.5 1V6H15v7a1 1 0 0 1-1 1H8.5Z" />
                      </svg>
                      <span>Projects</span>
                    </NavLink>
                  </div>
                </div>
              </div>

              <div className="inline-block lg:mb-16 text-left border-t border-theme-50 dark:border-theme-500 py-2">
                <Dropdown
                  align="bottom"
                  alignmentClasses="bottom-14"
                  renderTrigger={() => (
                    <div className="flex space-x-2 py-1 px-2 cursor-pointer hover:bg-theme-700 rounded">
                      <div className="rounded-full overflow-hidden shadow-md w-10 h-10 flex items-center justify-center border border-theme-50 dark:border-theme-500 shrink-0">
                        <img
                          className="h-10 w-10"
                          src="https://uptime-storage.s3.amazonaws.com/team-logos/f8867baae3ffeced637acd93fcd394de"
                        />
                      </div>
                      <div className="flex-grow mt-1 text-left dark:text-white">
                        <div className="leading-4 text-theme-300 dark:text-theme-200">
                          Team
                        </div>
                        <div className="dark:text-white font-bold mt-[1px] overflow-ellipsis overflow-hidden w-[150px] whitespace-nowrap">
                          ThemeXpert
                        </div>
                      </div>
                    </div>
                  )}
                >
                  <>
                    {/* <!-- Team Switcher --> */}
                    {page.props.auth.user?.all_teams?.map(team => (
                      <form onSubmit={e => switchToTeam(e, team)} key={team.id}>
                        <DropdownLink as="button">
                          <div className="flex items-center">
                            {team.id ==
                              page.props.auth.user?.current_team_id && (
                              <svg
                                className="mr-2 h-5 w-5 text-green-400"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            )}
                            <div>{team.name}</div>
                          </div>
                        </DropdownLink>
                      </form>
                    ))}

                    <div className="border-t border-theme-200 dark:border-theme-500" />

                    {/* <!-- Team Settings --> */}
                    <DropdownLink
                      href={route('teams.show', [
                        page.props.auth.user?.current_team!,
                      ])}
                    >
                      Manage Team
                    </DropdownLink>
                  </>
                </Dropdown>
              </div>
            </div>
          </div>
        </aside>
        <div className="flex">
          <div className="lg:w-[250px] shrink-0"></div>

          {/* <!-- Page Content --> */}
          <main className="container lg:max-w-[calc(100%-250px)] max-w-[1040px] mx-auto py-10 xl:max-w-[1040px]">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
