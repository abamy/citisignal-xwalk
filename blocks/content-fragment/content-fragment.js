import { getMetadata } from '../../scripts/aem.js';

/**
 *
 * @param {Element} decorate
 */
export default async function decorate(block) {
  const aemauthorurl = getMetadata('authorurl') || '';
  const aempublishurl = getMetadata('publishurl') || '';
  const persistedquery = '/graphql/execute.json/securbank/OfferByPath';
  const contentPath = block.querySelector(':scope div:nth-child(1) > div a').textContent.trim();
  const variationname = block
    .querySelector(':scope div:nth-child(2) > div')
    .textContent.trim()
    .toLowerCase();

  const url =
    window.location && window.location.origin && window.location.origin.includes('author')
      ? `${aemauthorurl}${persistedquery};path=${contentPath};variation=${variationname};ts=${
          Math.random() * 1000
        }`
      : `${aempublishurl}${persistedquery};path=${contentPath};variation=${variationname};ts=${
          Math.random() * 1000
        }`;
  const options = { credentials: 'include' };

  const cfReq = await fetch(url, options)
    .then((response) => response.json())
    .then((contentfragment) => {
      let offer = '';
      if (contentfragment.data) {
        offer = contentfragment.data.offerByPath.item;
      }
      return offer;
    });
  const itemId = `urn:aemconnection:${contentPath}/jcr:content/data/master`;

  block.innerHTML = `
  <div class='banner-content' data-aue-resource=${itemId} data-aue-label="offer content fragment" data-aue-type="reference" data-aue-filter="cf">
      <div class='banner-detail' style="background-image: linear-gradient(90deg,rgba(0,0,0,0.6), rgba(0,0,0,0.1) 80%) ,url(${
        aemauthorurl + cfReq.heroImage._path
      });">
          <p class='pretitle'>${cfReq.headline}</p>
          <p class='headline'>${cfReq.pretitle}</p>
          <p class='detail'>${cfReq.detail.plaintext}</p>
      </div>
      <div class='banner-logo'>
      </div>
  </div>
`;
}
