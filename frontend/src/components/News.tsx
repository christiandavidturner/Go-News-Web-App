import React, { FC, ReactElement, useEffect, useState } from "react";
import Story from "./Story";
import LoadingBar from "./LoadingBar";
import Spacer from "./Spacer";

export interface NewsProps {
  results?: (ResultsEntity)[] | null;
  
}
export interface ResultsEntity {
  section: string;
  title: string;
  abstract: string;
  url: string;
  multimedia?: (MultimediaEntity)[] | null;
  alt?:string | undefined;
}
export interface MultimediaEntity {
  url: string;
  caption?: string;
  alt?:string | undefined;
}

const News: FC<NewsProps> = ({results:ResultsEntity}):ReactElement => {
  const [error, setError] = useState<any>(null);
  const [stories, setStory] = useState<NewsProps>();

  useEffect(() => {
    const getCurrentPage = () => {
      const url = new URL(window.location.href);
      const page = url.pathname.split("/").pop();
      return page ? page : "home";
    };
    const section = getCurrentPage();
    fetch(
      `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=4fzCTy6buRI5xtOkZzqo4FfEkzUVAJdr`
    )
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => setStory(data), 1500);
        // console.log("Success ", data);
        // console.log("Title ", data.results[0].title);
        // console.log("Photo ", data.results[0].multimedia[0].url);
        // console.log("URL ", data.results[0].url);
      })
      .catch((error) => {
        console.log("Error", error);
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error && error.message}</div>;
  } else 
  if (!stories) {
    return <LoadingBar type={"cylon"} color={"#193152"} />;
  } else {
    return (
      <>
        <ul className="stories">
          {/* {stories.results.map((story, idx) => { */}
          {stories?.results?.map((story, idx, alt) => {
            return (
              <Story
                key={idx}
                title={story.title}
                abstract={story.abstract}
                img={
                  story &&
                  story.multimedia &&
                  story.multimedia[0] &&
                  story.multimedia[0].url
                    ? story.multimedia[0].url
                    : "https://www.gaithersburgdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.png"
                }
                alt={story?.multimedia?.[0]?.caption}
                link={story.url}
              />
            );
          })}
        </ul>
        <Spacer height={100} />
      </>
    );
  }
}
export default News;