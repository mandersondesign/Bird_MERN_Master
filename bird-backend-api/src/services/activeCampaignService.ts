import axios from 'axios';
import env from '../env';
import * as qs from 'qs';

// ActiveCampaign API
const acURL = env.ACTIVE_CAMPAIGN_URL;
const allListsURL = `${acURL}/api/3/lists`;
const allCustomFieldsURL = `${acURL}/api/3/fields`;
const allTagsURL = `${acURL}/api/3/tags`;
const contactSync = `${acURL}/api/3/contact/sync`;
const contactList = `${acURL}/api/3/contactLists`;
const contactTags = `${acURL}/api/3/contactTags`;
const acConfig = {
	headers: {
		Accept: 'application/json',
		'Api-Token': env.ACTIVE_CAMPAIGN_API_TOKEN
	}
};

// ActiveCampaign Event Tracking API
const acEventTrackingURL = env.ACTIVE_CAMPAIGN_EVENT_TRACKING_URL;
const acEventTrackingConfig = {
	headers: {
		'content-type': 'application/x-www-form-urlencoded'
	}
};

export default class ActiveCampaignService {

	public static async getListId(listName) {
		const { lists } = (await axios.get(allListsURL, acConfig)).data;
		const existingList = lists.find((list) => list.name === listName);
		return existingList ? existingList.id : null;
	}

	public static async getCustomFieldIds(fieldNames) {
		const { fields } = (await axios.get(allCustomFieldsURL, acConfig)).data;

		return fields.reduce((accum, curr) => {
			if (fieldNames.includes(curr.title)) {
				accum[curr.title] = curr.id;
			}
			return accum;
		}, {});
	}

	// AC returns 20 records by default and 100 at max
	// So we use the search query param to return a smaller subset of only relevant tags
	public static async getExistingTagId(contactTag) {
		const lowerCaseContactTag = contactTag.toLowerCase();
		const { tags } = (await axios.get(allTagsURL + `?search=${contactTag}`, acConfig)).data;

		const existingTag = tags.find(({ tag }) => lowerCaseContactTag === tag.toLowerCase());
		return existingTag ? existingTag.id : null;
	}

	public static async createNewTag(tagName) {
		const newTag = { tag: { tag: tagName, tagType: 'contact' } };
		const { tag } = (await axios.post(allTagsURL, newTag, acConfig)).data;

		return tag ? tag.id : null;
	}

	public static async createOrUpdateContact(contact) {
		return ((await axios.post(contactSync, contact, acConfig)).data);
	}

	public static async addContactToList(listId, contactId) {
		const listData = { contactList: { list: listId, contact: contactId, status: 1 } };
		return await axios.post(contactList, listData, acConfig);
	}

	public static async addTagToContact(tagName, contactId) {
		let tagId = await this.getExistingTagId(tagName);
		if (!tagId) {
			tagId = await this.createNewTag(tagName);
		}
		const tagData = { contactTag: { contact: contactId, tag: tagId } };
		return await axios.post(contactTags, tagData, acConfig);
	}

	public static async triggerEvent(eventName, eventData, contactEmail) {
		const data = {
			actid: env.ACTIVE_CAMPAIGN_EVENT_ACCOUNT_ID,
			key: env.ACTIVE_CAMPAIGN_EVENT_KEY,
			event: eventName,
			eventdata: eventData,
			visit: { email: contactEmail }
		};

		const urlEncodedData = qs.stringify(data);

		return await axios.post(acEventTrackingURL, urlEncodedData, acEventTrackingConfig);
	}

}
