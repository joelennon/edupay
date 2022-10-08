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

import { Badge, Pills, Pill } from "../../components";
import { ListContainer, List, ListItem } from "../../components/list";
import { Input } from "../../components/form";
import { formatTime } from "../../helpers/date";

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

    const {
        isLoading,
        isSuccess,
        data,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useInfiniteQuery(
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
                lastPage.next_page_url ? lastPage.current_page + 1 : undefined,
        }
    );

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
            {isLoading && <div>Loading...</div>}
            {data?.pages.length === 0 && <div>No courses to display.</div>}
            {data?.pages.length > 0 && <CourseList pages={data?.pages} />}
            {hasNextPage && !isFetchingNextPage && <div ref={observe} />}
        </div>
    );
};

const CourseList = ({ pages }): JSX.Element => (
    <ListContainer separate className="mb-8">
        <List separate>
            {pages.map((page) =>
                page.data?.map((course: Course) => (
                    <Course key={course.id} course={course} />
                ))
            )}
        </List>
    </ListContainer>
);

const Course = ({ course }: { course: Course }) => {
    const previous = useLocation();

    return (
        <ListItem separate noPadding>
            <Link
                to={course.url}
                state={{ previous }}
                className="block p-6 hover:bg-cyan-50"
            >
                <div className="font-semibold text-lg flex items-center">
                    <span>
                        {course.code} {course.title}
                    </span>
                    {course.new && (
                        <Badge color="indigo" text="NEW" className="ml-3" />
                    )}
                </div>
                {course.subtitle && (
                    <div className="font-medium text-cyan-600">
                        {course.subtitle}
                    </div>
                )}
                {course.description && (
                    <div className="mt-2 text-gray-500">
                        {course.description}
                    </div>
                )}
                <div className="mt-2 text-gray-600 font-semibold">
                    <div className="flex-items-center space-x-6">
                        <span>
                            {course.day} {formatTime(course.start_time)} &mdash;{" "}
                            {formatTime(course.end_time)}
                        </span>
                        <span>Duration: {course.duration}</span>
                        <span>
                            Fee: {course.currency}
                            {course.fee}
                        </span>
                    </div>

                    <div className="mt-1">Tutor: {course.tutor}</div>
                </div>
            </Link>
        </ListItem>
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

    console.log(searchParams);

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
