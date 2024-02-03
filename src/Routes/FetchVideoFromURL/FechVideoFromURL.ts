import { NextFunction, Request, Response, Router } from "express";
import ytdl, { videoInfo, Filter, chooseFormat } from "ytdl-core";
import checkauth from "../../middleware/checkauth";

const route = Router();

// Function to handle the route logic
const handleVideoRequest = async (req: Request, res: Response) => {
    
    try {
        const videoURL = req.params.videoID;
        const info: videoInfo = await ytdl.getInfo(videoURL);
        
        const { video, audio } = req.query;
        
        if (video === 'true' && audio === 'true') {
            sendAudioAndVideo(info, res);
        } else if (audio === 'true') {
            sendHighestAudioFormat(info, res);
        } else if (video === 'true') {
            sendHighestVideoFormat(info, res);
        } else {
            handleFilterRequest(req, info, res);
        }
    } catch (error: any) {
        handleError(res, error.message);
    }
};

const sendHighestAudioFormat = (info: videoInfo, res: Response) => {
    const format = chooseFormat(info.formats, { quality: "highestaudio" });
    sendResponse(res, format);
};

const sendAudioAndVideo = (info: videoInfo , res:Response) =>{
    const format = chooseFormat(info.formats,{filter:"audioandvideo"});
    sendResponse(res, format); // sending response after processing
}

const sendHighestVideoFormat = (info: videoInfo, res: Response) => {
    const format = chooseFormat(info.formats, { filter: "videoonly" });
    sendResponse(res, format);
};

// Function to handle filter-based request
const handleFilterRequest = (req: Request, info: videoInfo, res: Response) => {
    const filter = req.query.filter as Filter;

    if (filter) {
        const format = chooseFormat(info.formats, {
            filter: (format) => format.quality === filter,
        });

        if (format) {
            sendResponse(res, format);
        } else {
            sendErrorResponse(res, 'No suitable format found');
        }
    } else {
        sendResponse(res, info);
    }
};

// Function to send a JSON response
const sendResponse = (res: Response, data: any) => {
    res.json(data);
};

// Function to send an error response
const sendErrorResponse = (res: Response, errorMessage: string) => {
    res.status(500).json({ error: errorMessage });
};

// Error handler function
const handleError = (res: Response, errorMessage: string) => {
    console.error('Error:', errorMessage);
    res.status(500).json({ error: errorMessage });
};
 
// video details fetching 
async function fetchOnlyVideoDetails(req:Request,res:Response){
    const info: videoInfo = await ytdl.getInfo(req.params.videoID);
    res.json(info.videoDetails);
}

// Route handler
route.get('/video-url/:videoID/video-details',checkauth,fetchOnlyVideoDetails)
route.get('/video-url/:videoID?', checkauth, handleVideoRequest);

export default route;
