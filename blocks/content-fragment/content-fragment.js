/**
 *
 * @param {Element} decorate
 */
export default async function decorate(block) {
  const aemauthorurl = 'https://author-p130360-e1272151.adobeaemcloud.com';
  const contentPath = block.querySelector(':scope div:nth-child(1) > div a').textContent.trim();
  const variationname = block
    .querySelector(':scope div:nth-child(2) > div')
    .textContent.trim()
    .toLowerCase();

  const url = `${aemauthorurl}${contentPath}/jcr:content/data/${variationname}.json`;
  const options = { credentials: 'include' };

  const cfReq = await fetch(url, options).then((response) => response.json());

  block.innerHTML = `
  <div class='banner-content'>
      <div class='banner-detail' style="background-image: linear-gradient(90deg,rgba(0,0,0,0.6), rgba(0,0,0,0.1) 80%) ,url(${
        aemauthorurl + cfReq.heroImage
      });">
          <p class='pretitle'>${cfReq.headline}</p>
          <p class='headline'>${cfReq.pretitle}</p>
          <p class='detail'>${cfReq.detail}</p>
      </div>
      <div class='banner-logo'>
      </div>
  </div>
`;
}
