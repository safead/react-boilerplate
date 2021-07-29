import React, { useEffect, useRef } from 'react';
import { LogoIcon } from './LogoIcon';
import './preloader.css';

const fillStyle = {
  blue: 'rgb(55, 164, 255)',
  white: 'rgb(255, 255, 255)',
};
const endPos = 310; // высота вектора
const duration = 1500;  // скорость прохождения горизонтальной линии
const offsetLine = 50;  // количество пикселей, которое затрагивает горизонтальная линия при прохождении
const dotScaleSize = 1.4; // размер увеличения точки
const dotHorizontalOffset = 0.05; // отступ по вертикали при проходе линии
const restartDelay = 3000; // через сколько анимация повторится после полного прохождения линии 

const offsetCalc = (line, offsetX) => {
  if (Math.abs(line) < offsetLine) {
    const horizontalLine = 1 - Math.abs(line) / offsetLine;
    const offsetOnHover = horizontalLine * offsetX * dotHorizontalOffset;
    if (offsetX < 0) {
      return `${Math.abs(offsetOnHover)}px`;
    }
    return `-${offsetOnHover}px`;
  }
  return '0px';
};

const heightOffsetCalc = (line) =>  {
  const formatNumber = (dotScaleSize - (Math.abs(line) / 100));
  if (formatNumber < 1) {
    return 1;
  }
  return formatNumber;
};

const calculateColor = (n, list1, list2) => {
  return list2.map((x, i) => {
    if (x === list1[i]) return x;
    return x + (list1[i] - x) * n;
  });
};

const getColor = (line, cycle) => {
  const horizontalLine = 1 - Math.abs(line) / offsetLine;
  if (horizontalLine > 0) {
    const currentColor = fillStyle[cycle % 2 ? 'blue' : 'white'].replace(/[^\d,]/g, '').split(',');
    const secondColor = fillStyle[cycle % 2 ? 'white' : 'blue'].replace(/[^\d,]/g, '').split(',');
    const color =  calculateColor(horizontalLine, currentColor.map(Number), secondColor.map(Number));
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  } 
};

export const AppIndex = () => {
  let startTime = new Date().getTime();
  const svgRef = React.createRef();
  const lineRef = useRef(null);
  const heightLineRef = useRef(null);
  const pathOffsets = [];
  let cycle = 1;

  const stopAnimation = async () => {
    startTime = null;
    cycle++;
    await new Promise(resolve => setTimeout(resolve, restartDelay));
    startTime = new Date().getTime();
  };

  const render = (time) => {
    if (startTime === null) return;
    const lineTopOffset = lineRef.current.getBoundingClientRect().top + window.scrollY;
    pathOffsets.forEach((dot) => {
      const differenceSize = lineTopOffset - dot.offsetY;
      dot.path.style.transform = `scale(${heightOffsetCalc(differenceSize)}) translateX(${dot.offsetX > 8 || dot.offsetX < -8 ? offsetCalc(differenceSize, dot.offsetX) : 0})`;
      if (lineTopOffset >= dot.offsetY && differenceSize < offsetLine) {
        dot.path.style.fill = getColor(differenceSize, cycle);
        //  lineTopOffset >= dot.offsetY && differenceSize < offsetLine * 2 - bottom line
      }
    });
    const newOffset = (((new Date().getTime() - startTime) / duration) * endPos) % endPos;
    if ((new Date().getTime() - startTime) / duration > 1) {
      return stopAnimation();
    }
    lineRef.current.style.bottom = `${newOffset}px`;
  };
  const animationLoop = () => {
    render();
    requestAnimationFrame(animationLoop);
  };
  useEffect(() => {
    const heightOffset = heightLineRef.current.getBoundingClientRect().left;
    svgRef.current.childNodes.forEach(path => {
      pathOffsets.push({
        offsetY: path.getBoundingClientRect().top + window.scrollY,
        offsetX: heightOffset - path.getBoundingClientRect().left,
        path,
      });
    });
    animationLoop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="widget-animation">
      <LogoIcon ref={svgRef} />
      <div ref={lineRef} className="widget-stroke"/>
      <div ref={heightLineRef} className="widget-stroke-top"/>
    </div>
  );
};
