
let blogId = decodeURI(location.pathname.split("/").pop());

let docRef = db.collection("blogs").doc(blogId);

docRef.get().then((doc) => {
    if (doc.exists) {
        setupBlog(doc.data());
    } else {
        location.replace("/");
    }
})

const setupBlog = (data) => {
    const banner = document.querySelector('.banner1');
    const blogTitle = document.querySelector('.title');
    const titleTag = document.querySelector('title');
    const publish = document.querySelector('.published');

    const getImageUrl = (imagePath) => {
        return imagePath.startsWith('http') ? imagePath : `${location.origin}/${imagePath}`;
      }
    
      const bannerImageUrl = getImageUrl(data.bannerImage);
      banner.style.backgroundImage = `url("${bannerImageUrl}")`;
      console.log(bannerImageUrl);

    // Construct the full URL for the banner image
    // const bannerImageUrl = `${location.origin}/${data.bannerImage}`;
    // banner.style.backgroundImage = `url(${bannerImageUrl})`;
    // console.log(data.bannerImage);
    // banner.innerHTML=`<img src="${data.bannerImage}" class="article-image1">`
    // console.log(bannerImageUrl);

    titleTag.innerHTML += blogTitle.innerHTML = data.title;
    publish.innerHTML += data.publishedAt;

    const article = document.querySelector('.article');
    addArticle(article, data.article);
}

// ... (rest of the code remains the same)

const addArticle = (ele, data) => {
    data = data.split("\n").filter(item => item.length);
    // console.log(data);

    data.forEach(item => {
        // check for heading
        if(item[0] == '#'){
            let hCount = 0;
            let i = 0;
            while(item[i] == '#'){
                hCount++;
                i++;
            }
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`
        } 
        //checking for image format
        else if(item[0] == "!" && item[1] == "["){
            let seperator;

            for(let i = 0; i <= item.length; i++){
                if(item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")"){
                    seperator = i;
                }
            }

            let alt = item.slice(2, seperator);
            let src = item.slice(seperator + 2, item.length - 1);
            ele.innerHTML += `
            <img src="${src}" alt="${alt}" class="article-image">
            `;
            console.log("hi");
        }

        else{
            ele.innerHTML += `<p>${item}</p>`;
        }
    })
}