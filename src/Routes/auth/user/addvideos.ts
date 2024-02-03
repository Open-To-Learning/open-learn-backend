import { NextFunction, Request, Response } from "express";
import { User } from "../../../DB/Models/userModel";
import ytdl, { videoInfo } from "ytdl-core";
import { Course } from "../../../DB/Models/courseModel";

async function imageUrlToBase64(url: string) {
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

export default async function addNewVideo(req: Request, res: Response, next: NextFunction) {
  const cookiesData: any = req.params.cookiesData;
  const userName = req.params.userName;
  const youtubeVideoId = req.params.youtubeVideoId;

  if (cookiesData.userName !== userName) {
    res.status(400).json({
      status: 400,
      message: 'Cookies name and id name mismatch',
    });
    return;
  }

  try {
    const info: videoInfo = await ytdl.getInfo(youtubeVideoId);
    const { title, description, lengthSeconds, uploadDate, videoId, thumbnails, keywords } = info.videoDetails;
    const thumbnail: any = thumbnails[thumbnails.length - 1];

    const imageBase64 = await imageUrlToBase64(thumbnail.url);

    const course = new Course({
      videoId,
      title,
      description,
      lengthSeconds,
      uploadDate,
      thumbnail: {
        width: thumbnail.width,
        height: thumbnail.height,
        base64: imageBase64,
      },
      author: userName,
      paid: false,
      tags: keywords,
    });

    await course.save();

    // Save course.id to the coursesIds array in the User model
    const user = await User.findOneAndUpdate(
      { userName: userName },
      { $push: { coursesIds: course.id } },
      { new: true }
    );

    res.json({
        course,
        user
    });
  } catch (err: any) {
    res.status(404).json({
      status: 404,
      message: err.message,
    });
  }
}
