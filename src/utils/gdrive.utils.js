// const fs = require("fs");
// const readline = require("readline");
// const { google } = require("googleapis");
// const REFRESH_TOKEN = process.env.GOOGLE_API_REFRESH_TOKEN;
// const cerdentials = JSON.parse(fs.readFileSync("credentials.json"));
// const { client_secret, client_id, redirect_uris } = cerdentials["web"];
// const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
// const uuid = require("uuid");
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
// class GgDriveAPI {
// 	constructor() {
// 		this.driveServices = google.drive({ version: "v3", auth: oAuth2Client });
// 		this.requestId = uuid.v4();
// 	}
//
// 	async checkFilesExists(children, parent) {
// 		let pageToken = "";
// 		const q = parent ? "name = '" + children + "' and '" + parent + "' in parents" : "name = '" + children + "'";
// 		do {
// 			const params = {
// 				fields: "nextPageToken, files(id, name)",
// 				spaces: "drive",
// 				includeItemsFromAllDrives: true,
// 				supportsAllDrives: true,
// 				pageToken: pageToken || "",
// 				pageSize: 1000,
// 				q: q,
// 			};
// 			const res = await this.driveServices.files.list(params);
// 			pageToken = res.data.nextPageToken;
// 			const files = res.data.files;
// 			if (files.length > 0) {
// 				return { status: true, fileId: files[0].id };
// 			}
// 		} while (pageToken);
// 		return { status: false, fileId: "" };
// 	}
//
// 	async uploadFile(childId, filePath) {
// 		/*
//   @param childId: is parent folder id
//   @param filePath: is file path in local machine
//   @param fileName: is file name in local machine
//    */
// 		const fileName = filePath.split("/").pop();
// 		console.log(filePath, fileName);
// 		const fileMetadata = {
// 			name: fileName,
// 			parents: [childId],
// 		};
// 		const media = {
// 			mimeType: "*/*",
// 			body: fs.createReadStream(filePath),
// 		};
// 		const fileExisted = await this.checkFilesExists(fileName, childId);
// 		if (fileExisted) {
// 			console.log(fileExisted.status, fileName, childId);
// 			const file = await this.driveServices.files.update({
// 				media: media,
// 				addParents: [childId],
// 				fileId: fileExisted.fileId,
// 			});
// 			console.log("File Id: ", file.data.id);
// 			fs.unlinkSync(filePath);
// 			console.log(`Deleted ${filePath} in local machine`);
// 			return file.data.id;
// 		}
// 		const file = await this.driveServices.files.create({
// 			resource: fileMetadata,
// 			media: media,
// 			fields: "id",
// 			supportsAllDrives: true,
// 		});
// 		console.log("File Id: ", file.data.id);
// 		fs.unlinkSync(filePath);
// 		console.log(`Deleted ${filePath} in local machine`);
// 		return file.data.id;
// 	}
//
// 	async permission(id, permission) {
// 		// let permission = {
// 		//   type: "anyone",
// 		//   role: "reader",
// 		// };
// 		// let permission = [
// 		//   {
// 		//     type: "anyone",
// 		//     role: "reader",
// 		//   },
// 		//   {
// 		//     type: "user",
// 		//     role: "reader",
// 		//     emailAddress: "4bits.1001@gmail.com",
// 		//   },
// 		// ];
// 		// console.log("permission", permission);
// 		const res = await this.driveServices.permissions.create({
// 			resource: permission,
// 			supportsAllDrives: true,
// 			fileId: id,
// 			fields: "id",
// 		});
// 		console.log("Permission ID: ", res.data.id);
// 	}
//
// 	async createFolder(cfolderName, pfolderName) {
// 		/*
//   @param cfolderName: is child folder name
//   @param pfolderName: is parent folder name
//   @param cb: is callback function
//    */
// 		if (pfolderName !== "" && cfolderName !== "") {
// 			const existsShared = await this.isExists(pfolderName);
// 			if (existsShared.status) {
// 				const existsFolder = await this.isExists(cfolderName, existsShared.fileId);
// 				if (!existsFolder.status) {
// 					let fileMetadata = {
// 						name: cfolderName,
// 						parents: [p.fileId],
// 						mimeType: "application/vnd.google-apps.folder",
// 					};
// 					const res = await driveServices.files.create({
// 						resource: fileMetadata,
// 						supportsAllDrives: true,
// 						fields: "id",
// 					});
// 					return res.data.id;
// 				} else {
// 					console.log(`${cfolderName} File/Folder is Already Exists - ${existsFolder.fileId}`);
// 					return existsFolder.fileId;
// 				}
// 			}
// 		} else if (pfolderName === "" && cfolderName != "") {
// 			const existsShared = await this.isExistsShared(cfolderName);
// 			if (!existsShared.status) {
// 				let fileMetadata = {
// 					name: cfolderName,
// 					mimeType: "application/vnd.google-apps.folder",
// 				};
// 				const res = await this.driveServices.files.create({
// 					resource: fileMetadata,
// 					supportsAllDrives: true,
// 					fields: "id",
// 				});
// 				return res.data.id;
// 			} else {
// 				console.log(`${cfolderName} File/Folder is Already Exists - ${existsFolder.fileId}`);
// 				return existsShared.fileId;
// 			}
// 		}
// 	}
// }
// module.exports = new GgDriveAPI();
