import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ForceDirectedGraph = () => {
  const targetRef = useRef(null);

  useEffect(() => {
    const width = 600;
    const height = 400;

    const nodes = [
      { id: 'company', type: 'company' },
      { id: 'supplier-1', type: 'supplier' },
      { id: 'supplier-2', type: 'supplier' },
      { id: 'competitor-1', type: 'competitor' },
      { id: 'competitor-2', type: 'competitor' },
      { id: 'customer-1', type: 'customer' },
      { id: 'customer-2', type: 'customer' },
    ];

    const links = [
      { source: 'supplier-1', target: 'company' },
      { source: 'supplier-2', target: 'company' },
      { source: 'company', target: 'competitor-1' },
      { source: 'company', target: 'competitor-2' },
      { source: 'company', target: 'customer-1' },
      { source: 'company', target: 'customer-2' },
    ];

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3.forceLink(links).id((d) => d.id),
      )
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    const svg = d3.select(targetRef.current).append('svg').attr('viewBox', [0, 0, width, height]);

    const link = svg
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', (d) => Math.sqrt(d.value));

    const node = svg
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 5)
      .attr('fill', (d) => {
        switch (d.type) {
          case 'company':
            return 'blue';
          case 'supplier':
            return 'green';
          case 'competitor':
            return 'red';
          case 'customer':
            return 'orange';
          default:
            return 'black';
        }
      })
      .call(drag(simulation));

    const label = svg
      .selectAll('text')
      .data(nodes)
      .join('text')
      .text((d) => d.id)
      .attr('x', 8)
      .attr('y', 4);

    simulation.on('tick', () => {
      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
      label.attr('x', (d) => d.x + 8).attr('y', (d) => d.y + 4);
      link.attr('x1', (d) => d.source.x).attr('y1', (d) => d.source.y).attr('x2', (d) => d.target.x).attr('y2', (d) => d.target.y);
    });

    return () => {
      svg.remove();
    };
  }, []);

  const drag = (simulation) => {
    function dragStarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragEnded(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return d3.drag().on('start', dragStarted).on('drag', dragged).on('end', dragEnded);
  };

  return <div ref={targetRef} />;
};

export default ForceDirectedGraph;