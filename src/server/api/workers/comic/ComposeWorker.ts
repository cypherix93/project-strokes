import {Chapter} from "../../../database/models/comic/Chapter";
import {SessionManager} from "../../../database/SessionManager";

export class ComposeWorker
{
    public static createChapter(chapterDetails): Chapter
    {
        // Validate chapter
        if (!chapterDetails.title)
            return null;

        var newChapter = new Chapter();
        newChapter.title = chapterDetails.title;
        newChapter.episodes = [];

        var session = SessionManager.createSession();
        session.save(newChapter);
        session.close();

        return newChapter;
    }
}
