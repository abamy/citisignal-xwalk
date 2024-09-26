/**
 *
 * @param {Element} decorate
 */
export default async function decorate(block) {
  const aemauthorurl = 'https://author-p130360-e1272151.adobeaemcloud.com';
  const contentPath = block.querySelector(':scope div:nth-child(1) > div a').innerHTML.trim();
  const variationname = block
    .querySelector(':scope div:nth-child(2) > div')
    .innerHTML.trim()
    .toLowerCase();

  const url = `${aemauthorurl}/${contentPath}/jcr:content/data/${variationname}.json`;
  const options = { credentials: 'include' };

  const cfReq = await fetch(url, options).then((response) => response.json());

  block.innerHTML = `
        <div>
            ${JSON.stringify(cfReq)}
        </div>
      `;
}
