import { NextFunction, Request, Response } from "express";
import ytdl, { videoInfo } from "ytdl-core";
import { Course } from "../../../DB/Models/courseModel";
// import { User } from "../../../DB/Models/userModel";

export  async function imageUrlToBase64(url: any) {
  try {
    const response = await fetch(url);
    const blob = await response.arrayBuffer();
    const contentType = response.headers.get('content-type');
    const base64String = `data:${contentType};base64,${Buffer.from(
      blob,
    ).toString('base64')}`;
    return base64String;
  } catch (err) {
    console.log(err);
  }
}

export default async function refetchVideo(req: Request, res: Response, next: NextFunction) {
  const cookiesData: any = req.params.cookiesData;
  const {userName ,youtubeVideoId} = req.body;

  if (cookiesData.userName !== userName) {
    res.status(400).json({
      status: 400,
      message: 'Cookies name and id name mismatch',
    });
    return ;
  }

 


  try {
    const info: videoInfo = await ytdl.getInfo(youtubeVideoId);
    const { title, description, lengthSeconds, uploadDate, videoId, thumbnails, keywords } = info.videoDetails;
    const thumbnail: any = thumbnails[thumbnails.length - 1];

    const imageBase64 = await imageUrlToBase64(thumbnail.url);

    const updatedCourse = await Course.findOneAndUpdate(
        {
            videoId:youtubeVideoId,
            author:userName
        },
        { 
            title,
            description,
            lengthSeconds,
            uploadDate,
            videoId,
            thumbnail: {
            width: thumbnail.width,
            height: thumbnail.height,
            base64: imageBase64,
            },
            tag:keywords },
        {new:true,upsert:true}    
      );
      if(!updatedCourse){
        res.status(404).json({
            status:404,
            message:"no course found in your id"
        })
      }
    res.status(200).json({
        updatedCourse
    });
  } catch (err: any) {
    res.status(404).json({
      status: 404,
      message: err.message,
    });
  }
}
