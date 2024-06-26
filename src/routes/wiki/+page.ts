import { wikiMaxNavDepth } from '$lib/config';
import { error } from '@sveltejs/kit';
import GithubSlugger from 'github-slugger';

interface IRemarkHeading {
	level: number;
	title: string;
}

export interface IHeading {
	title: string;
	href: string;
	level: number;
	subtitles?: IHeading[];
}

function pushHeading(headingList: IHeading[], currentHeader: IHeading) {
	const size = headingList.length;

	if (size <= 0) {
		headingList.push(currentHeader);
		return;
	}
	const previous = headingList[headingList.length - 1];

	if (currentHeader.level <= previous.level) {
		headingList.push(currentHeader);
		return;
	}
	if (previous.subtitles === undefined) {
		previous.subtitles = [];
	}
	pushHeading(previous.subtitles, currentHeader);
}

export async function load() {
	try {
		//@ts-expect-error only a ide problem
		const site = await import(`../../content/wiki.md`);

		const headings: IRemarkHeading[] = site.metadata.headings;

		const initalValue: IHeading[] = [];
		const slugger = new GithubSlugger();

		const headers = headings.reduce((resaltArray, curr) => {
			if (curr.level > wikiMaxNavDepth) {
				return resaltArray;
			}
			const currentHeading: IHeading = {
				title: curr.title,
				href: `#${slugger.slug(curr.title)}`,
				level: curr.level
			};

			pushHeading(resaltArray, currentHeading);

			return resaltArray;
		}, initalValue);

		return {
			content: site.default,
			meta: site.metadata,
			headers: headers
		};
	} catch (e) {
		error(404, `Could not find Wiki`);
	}
}
