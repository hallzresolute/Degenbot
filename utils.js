export async function plot(tags) {
    tagList = "order:random " + tags + BLACKLIST;
    console.log("running plot command");

    console.log(tagList);
    booru.posts({ tags: tagList }).then(posts => {
        const index = Math.floor(Math.random() * posts.length);
        const post = posts[index];

        try {
            url = booru.url(post.file_url);

            return("Here's your plot: \n" + url);
        } catch {
            return("I'm sorry, I cannot find what you are looking for.");
        }
    })
}

export async function plotRated(rating, tags) {
    tagList = "rating:" + rating + " order:random " + tags + BLACKLIST;
    console.log("running plot command with rating:" + rating);

    console.log(tagList);
    booru.posts({ tags: tagList }).then(posts => {
        const index = Math.floor(Math.random() * posts.length);
        const post = posts[index];

        try {
            url = booru.url(post.file_url);

            return("Here's your plot: \n" + url);
        } catch {
            return("I'm sorry, I cannot find what you are looking for.");
        }
    })
}

export async function searchNumbers(numbers) {
    console.log("running numbers command");
    if (numbers.length != 6)
        return("The numbers Mason, what do they mean?");
        
    urlList = ["https://9hentai.to/g/" + numbers + "/",
                    "http://www.hbrowse.com/" + numbers + "/c00001",
                    "https://www.tsumino.com/entry/" + numbers,
                    "https://nhentai.net/g/" + numbers + "/",
                    "https://asmhentai.com/g/" + numbers + "/",
                    "https://imhentai.xxx/gallery/" + numbers + "/",
                    "https://hentaifox.com/gallery/" + numbers + "/"]

    for (url in urlList) {
        if (await checkURL(urlList[url]) === true) {
            console.log("found " + urlList[url]);
            return("I found the plot you were looking for at: " + urlList[url]);
        }
    }

    return("I'm sorry, I cannot find the numbers you are looking for.");
}

async function checkURL(url) {
    request = new XMLHttpRequest();

    request.timeout = 500;

    request.open("GET", url, false);
    request.send();

    if (request.status === 404) {
        console.log(url + " does not exist");
        return false;
    } else {
        console.log(url + " exists");
        return true;
    }
}

export function help(str) {
    helpString = str.trim().toLowerCase()
    helpRegex = /^[a-zA-Z]+$/
    cleanStr = helpRegex.exec(helpString)

    switch(cleanString) {
        case "plot":
        return("The plot command gives a random SFW/NSFW image or animation from 'donmai.danbooru.us'.")
        case "splot":
        return("The splot command gives a random SFW image or animation from 'donmai.danbooru.us'.")
        case "qplot":
        return("The qplot command gives a random questionably SFW image or animation from 'donmai.danbooru.us'.")
        case "eplot":
        return("The eplot command gives a random NSFW image or animation from 'donmai.danbooru.us'.")
        case "numbers":
        return("The numbers command searches through several doujinshi sites to find what you searched. (Some sites return a URL even if there is nothing on it, so this command does not always work).")
        default:
        return("Sorry I cannot help with what you are looking for.")
    }
}