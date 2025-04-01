import App from "./apps/App";
import PhotoQuestion from "./apps/PhotoQuestion";

export default (app, lang) => {
  console.log(app)
        switch (app) { 
          case "cutbg":
            return <App lang={lang}></App>
          case "image-question":
            return <PhotoQuestion lang={lang}></PhotoQuestion>
        }
}