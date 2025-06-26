export interface ForumReply {
	username: string;
	date: string;
	reply: string;
}

export interface Forum {
	id: string;
	forum_title: string;
	forum_desc: string;
	forum_img: string;
	forum_like: number;
	forum_publisher: string;
	createdAt: string;
	updatedAt: string;
	forum_reply: ForumReply[];
}
