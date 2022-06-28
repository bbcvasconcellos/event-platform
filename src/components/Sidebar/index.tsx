import { gql, useQuery } from "@apollo/client"

import { LessonCard } from "../LessonCard"

const GET_LESSONS_QUERY = gql`
  query {
    lessons(orderBy: updatedAt_ASC, stage: PUBLISHED) {
      id
      lessonType
      slug
      title
      availableAt
    }
  }
`

interface GetLessonsQueryResponse {
  lessons: {
    id: string;
    title: string;
    slug: string;
    availableAt: string;
    lessonType: 'live' | 'class'
  }[]
}

export const Sidebar = () => {
  const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY);
  return (
    <aside className="w-[348px] bg-gray-700 p-6 borde-l border-gray-600">
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">Cronograma de aulas</span>
      <div className="flex flex-col gap-8">
        { data?.lessons.map(lesson => (
          <LessonCard 
            key={lesson.id}
            title={lesson.title}
            lessonSlug={lesson.slug}
            type={lesson.lessonType}
            availableAt={new Date(lesson.availableAt)}
          />
        ))}
      </div>
    </aside>
  )
}