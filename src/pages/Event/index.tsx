import { gql, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Header } from "../../components/Header"
import { Sidebar } from "../../components/Sidebar"
import { VideoPlayer } from "../../components/VideoPlayer"

const GET_LESSON_SLUGS = gql` 
  query {
    lessons(orderBy: updatedAt_ASC, stage: PUBLISHED) {
      slug
    }
  }
`

interface GetLessonSlugsProps {
  lessons: {
    slug: string;
  }[]
}


export const Event = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useQuery<GetLessonSlugsProps>(GET_LESSON_SLUGS);
  
  const [defaultLesson, setDefaultLesson] = useState<string | undefined>('');

  useEffect(() => {
    if(!slug) {
      setDefaultLesson(data?.lessons[0].slug)
    }
  }, [data]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        { slug || defaultLesson ? 
          <VideoPlayer defaultSlug={defaultLesson}/> 
          : <div className="flex-1" />}
        <Sidebar />
      </main>
    </div>
  )
}