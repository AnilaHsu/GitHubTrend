import { useAppSelector } from "../redux";
import "../style/homePage.scss";
import TrendFilter from "../components/TrendFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { GitHubTrend } from "../type";

export function HomePage(): JSX.Element {
  const languageName = useAppSelector((state) => state.trend.langName);
  const trendingData = useAppSelector((state) => state.trend.trendData);
  const loadingStatus = useAppSelector((state) => state.trend.status)
  const listItems: JSX.Element[] = trendingData.map(
    (trend: GitHubTrend, index: number) => {
      return (
        <div className="trend-row" key={index}>
          <div className="trend-left">
            <a
              className="trend-link"
              href={trend.link !== null ? trend.link : ""}
            >
              <h2 className="repos-name">
                <span>{trend.author}/</span>
                <span>{trend.name}</span>
              </h2>
            </a>
            <p className="repos-describe">{trend.description}</p>
          </div>
          <div className="trend-right">
            {Boolean(trend.programmingLanguage) && (
              <span className="other-info">
                <FontAwesomeIcon icon={solid("code")} className="icon" />
                {trend.programmingLanguage}
              </span>
            )}
            {Boolean(trend.stars) && (
              <span className="other-info">
                <FontAwesomeIcon icon={regular("star")} className="icon" />
                {trend.stars}
              </span>
            )}
            {Boolean(trend.forks) && (
              <span className="other-info">
                <FontAwesomeIcon icon={solid("code-fork")} className="icon" />
                {trend.forks}
              </span>
            )}
          </div>
        </div>
      );
    }
  );
  const loading = (
    <div className="loading">
      <p className="loading-text">Loading ...</p>
      <lottie-player
        src="https://assets6.lottiefiles.com/packages/lf20_T4XJOLEPj5.json"
        background="transparent"
        speed="1"
        style={{width: 500 , height: 500 }}
        loop
        autoplay
      ></lottie-player>
    </div>
  );

  const noData: JSX.Element = (
    <div className="no-data-container">
      It looks like we don&apos;t have any trending repositories
      {languageName !== "" ? ` for ${languageName}` : ""}.
    </div>
  );
  return (
    <main>
      <div className="trend-title">
        <h1>GitHub Trending</h1>
        <p>See what the GitHub community is most excited about today.</p>
      </div>
      <section className="trending">
        <div className="trend-table">
          <TrendFilter />
          <div className="trend-content">
            { loadingStatus === "loading" ? loading : trendingData.length > 0 ? listItems : noData}
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;