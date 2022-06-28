import { gql, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { DiscordLogo, FileArrowDown, Lightning } from "phosphor-react"

import { DownloadableCards } from "../downloadableCards"

const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug ($slug: String) {
    lesson(where: {slug: $slug}) {
      videoId
      title
      description
      teacher {
        avatarURL
        bio
        name
      }
    }
  }
`

interface GetLessonBySlugResponse {
  lesson: {
    title: string;
    videoId: string;
    description: string;
    teacher: {
      avatarURL: string;
      bio: string;
      name: string;
    }
  }
}

interface DefaultLessonSlug {
  defaultSlug?: string;
}

export const VideoPlayer = ({ defaultSlug }: DefaultLessonSlug) => {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
    variables: {
      slug: slug ? slug : defaultSlug
    }
  })

  if(!data) {
    return(
      <div className="flex-1">
        ...Loading
      </div>
    )
  }
  return (
    <div className="flex-1">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <iframe
            className="w-full h-full" 
            src={`https://www.youtube.com/embed/${data?.lesson.videoId}`}
            title="YouTube video player"
            allow="picture-in-picture"  
          />
        </div>
      </div>
      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {data.lesson.title}
            </h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              {data.lesson.description}
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a 
                href="https://github.com/bbcvasconcellos"
                target="_blank"  
              >
                <img 
                  src={data.lesson.teacher.avatarURL} 
                  alt="professor's avatar" 
                  className="h-16 w-16 border-2 border-blue-500 rounded-full"  
                />
              </a>
              <div className="eading-relaxed">
                <strong className="font-bold text-2xl block">{data.lesson.teacher.name}</strong>
                <span className="text-gray-200 text-sm block">{data.lesson.teacher.bio}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4"> 
            <a 
              href="#" 
              className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:brightness-75 ease-in-out duration-300"
            >
              <DiscordLogo size={24} />
              Discord group
            </a>
            <a 
              href="#" 
              className="p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 duration-300" 
            >
              <Lightning size={24} />
              Access Challenge
            </a>
          </div>
        </div>
        <div className="gap-8 mt-20 grid grid-cols-2">
          <DownloadableCards 
            href="#"
            title="Extra content"
            subtitle="Download the bonus content files to sharp your learning"
            type={<FileArrowDown size={40}/>}
          />
          <DownloadableCards 
            href="#"
            title="Exclusive wallpapers"
            subtitle="Download the exclusive and limited wallpapers to customize your machine!"
            type={<FileArrowDown size={40}/>}
          />
        </div>
      </div>
    </div>
  )
}