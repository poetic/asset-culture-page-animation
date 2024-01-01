document.addEventListener('DOMContentLoaded', () => {
  // target root
  const animationRoot = document.getElementById('animationRoot');

  // create svg and path for circle to follow
  const svgForPath = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgForPath.setAttribute('id', 'svgPath');
  svgForPath.setAttribute('viewBox', '0 -3 50 10');
  svgForPath.style.overflow = 'hidden';

  const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  svgPath.setAttribute('d', 'm54 1c-18-5-36 5-54 0');
  svgPath.setAttribute('fill', 'transparent');

  // create and append append circle to svg element
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('r', '0.75px');
  circle.setAttribute('fill', '#154571');
  circle.style.zIndex = 100;
  circle.style.position = 'absolute';
  circle.style.top = '0px';
  circle.style.left = '0px';
  svgForPath.appendChild(circle);

  animationRoot.appendChild(svgForPath);

  // create top svg, path, append path to svg and then svg to root
  const topSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  topSvg.setAttribute('id', 'topSvg');
  topSvg.setAttribute('viewBox', '0 -3 50 10');

  const topSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  topSvgPath.setAttribute('d', 'm0 0c18 5 36-5 54 0l0-6-54 0z');
  topSvgPath.setAttribute('fill', '#F8F6F3');
  topSvg.appendChild(topSvgPath);

  animationRoot.appendChild(topSvg);

  // create bottom svg, path, append path to svg and then svg to root
  const bottomSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  bottomSvg.setAttribute('id', 'bottomSvg');
  bottomSvg.setAttribute('viewBox', '0 0 50 10');

  const bottomSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  bottomSvgPath.setAttribute('d', 'm54 5c-18-5-36 5-54 0l0 6 54-0z');
  bottomSvgPath.setAttribute('fill', '#F8F6F3');
  bottomSvg.appendChild(bottomSvgPath);

  animationRoot.appendChild(bottomSvg);

  // create gradient div
  const cultureGradient = document.createElement('div');

  cultureGradient.setAttribute('id', 'cultureGradient');
  cultureGradient.style.transform = 'translateX(-100%)';
  animationRoot.appendChild(cultureGradient);

  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  const percentageScale = (top, height) => {
    if (top + height > vh) return 0;
    if (top < 0) return 1;
    const maxRange = vh - height;
    return 1 - top / maxRange;
  };

  window.addEventListener('scroll', () => {
    const animationRootRect = animationRoot.getBoundingClientRect();
    const animationRootTop = animationRootRect.top;
    const animationRootHeight = animationRootRect.height;

    // animate circle along svgPath
    const pathLength = svgPath.getTotalLength();
    const percentage =
      1 - Math.max(Math.min(percentageScale(animationRootTop, animationRootHeight), 0.915), 0.01);
    const point = svgPath.getPointAtLength(pathLength * percentage);
    circle.setAttribute('cx', point.x);
    circle.setAttribute('cy', point.y);

    cultureGradient.style.transform = `translateX(${
      percentageScale(animationRootTop, animationRootHeight) * 100 - 100
    }%)`;
  });
});
