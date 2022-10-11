import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
    useParams,
    useSearchParams,
    Link,
    useLocation,
} from "react-router-dom";
import { useInView } from "react-cool-inview";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useDebounce } from "use-debounce";

import { Badge, Empty, Loading, Pills, Pill } from "../../components";
import { ListContainer, List, ListItem } from "../../components/list";
import { Input } from "../../components/form";
import { formatTime } from "../../helpers/date";
import { AcademicCapIcon } from "@heroicons/react/24/outline";

type Course = {
    id: number;
    code: string;
    title: string;
    subtitle?: string;
    description?: string;
    new?: boolean;
    day: string;
    start_time: string;
    end_time: string;
    duration: string;
    currency: string;
    fee: number;
    tutor: string;
    url: string;
};

export default () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query") ?? "";

    const params = useParams();
    const categoryId = params.categoryId?.split("-").pop();

    const { isLoading, data, hasNextPage, isFetchingNextPage, fetchNextPage } =
        useInfiniteQuery(
            ["courses", "list", categoryId, query],
            async ({ pageParam = 1, signal }) => {
                let uri = `/api/courses?page=${pageParam}`;

                if (categoryId) {
                    uri = `/api/categories/${categoryId}/courses?page=${pageParam}`;
                }

                if (query) {
                    uri += `&query=${query}`;
                }

                const { data } = await axios.get(uri, {
                    signal,
                });

                return data;
            },
            {
                getNextPageParam: (lastPage, allPages) =>
                    lastPage.next_page_url
                        ? lastPage.current_page + 1
                        : undefined,
            }
        );

    const isEmpty =
        data?.pages.length === 1 && data?.pages[0].data.length === 0;

    const { observe } = useInView({
        rootMargin: "50px 0px",
        onEnter: ({ unobserve }) => {
            unobserve();
            fetchNextPage();
        },
    });

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="font-bold my-4 text-2xl">Courses List</div>
                <Search />
            </div>
            <CategoryList />
            {isLoading && <Loading />}
            {isEmpty && (
                <Empty
                    icon={AcademicCapIcon}
                    title="No courses found"
                    description="There are no courses to display"
                />
            )}
            {data?.pages.length > 0 && <CourseList pages={data?.pages} />}
            {hasNextPage && !isFetchingNextPage && <div ref={observe} />}
        </div>
    );
};

const CourseList = ({ pages }): JSX.Element => (
    <div className="grid grid-cols-4 gap-4">
        {pages.map((page) =>
            page.data?.map((course: Course) => (
                <Course key={course.id} course={course} />
            ))
        )}
    </div>
);

const Course = ({ course }: { course: Course }) => {
    const previous = useLocation();

    return (
        <Link
            to={course.url}
            state={{ previous }}
            className="group overflow-hidden bg-white rounded-lg shadow hover:bg-cyan-50 flex flex-col"
        >
            <img
                className="aspect-video object-cover group-hover:opacity-80"
                src="https://images.unsplash.com/photo-1585758874546-c593da5f29e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
            />
            <div className="p-4 flex flex-col justify-between flex-1">
                <div
                    className="font-semibold text-lg line-clamp-2 flex-1"
                    title={course.title}
                >
                    {course.title}
                </div>
                <div className="mt-2 text-gray-600">
                    <div>
                        <div className="flex justify-between items-center">
                            <div>{course.day}</div>
                            <div>{course.duration}</div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                {formatTime(course.start_time)} &mdash;{" "}
                                {formatTime(course.end_time)}
                            </div>
                            <div className="font-semibold text-gray-900">
                                {course.currency}
                                {course.fee}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const CategoryList = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const { isSuccess, data } = useQuery(["categories"], async ({ signal }) => {
        const { data } = await axios.get(`/api/categories`, {
            signal,
        });

        return data;
    });

    if (!isSuccess) return null;

    const appendQuery = query ? `?query=${query}` : null;

    return (
        <div className="space-x-2 flex items-center whitespace-nowrap">
            <span className="font-medium text-xs mr-2 pb-4">
                Browse by Category:
            </span>
            <div className="whitespace-nowrap flex flex-nowrap space-x-2 overflow-x-auto pb-4">
                <Pill
                    pill={{ uri: "/courses", name: "All Categories" }}
                    appendQuery={appendQuery}
                />
                <Pills pills={data} appendQuery={appendQuery} />
            </div>
        </div>
    );
};

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("query") ?? "");
    const [debouncedQuery] = useDebounce(query, 600);

    useEffect(() => {
        if (debouncedQuery) {
            setSearchParams({ query: debouncedQuery });
        } else {
            setSearchParams({});
        }
    }, [debouncedQuery]);

    return (
        <Input
            label="Search for a course"
            placeholder="Search for a course..."
            id="query"
            name="query"
            value={query}
            setValue={setQuery}
            hiddenLabel
            icon={MagnifyingGlassIcon}
            autoComplete="off"
            autoFocus
        />
    );
};
