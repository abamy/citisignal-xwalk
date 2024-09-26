/**
 *
 * @param {Element} decorate
 */
export default async function decorate(block) {
  const aempublishurl = 'https://publish-p130360-e1272151.adobeaemcloud.com';
  const aemauthorurl = 'https://author-p130360-e1272151.adobeaemcloud.com';
  const persistedquery = '/graphql/execute.json/securbank/OfferByPath';
  const contentPath = block.querySelector(':scope div:nth-child(1) > div a').innerHTML.trim();
  const variationname = block.querySelector(':scope div:nth-child(2) > div').innerHTML.trim();

  const url =
    window.location && window.location.origin && window.location.origin.includes('author')
      ? `${aemauthorurl}${persistedquery};path=${contentPath};variation=${variationname};ts=${
          Math.random() * 1000
        }`
      : `${aempublishurl}${persistedquery};path=${contentPath};variation=${variationname};ts=${
          Math.random() * 1000
        }`;
  const options = { credentials: 'include' };

  const cfReq = await fetch(url, options).then((response) => response.json());

  block.innerHTML = `
        <div>
            ${JSON.stringify(cfReq)}
        </div>
      `;
}
