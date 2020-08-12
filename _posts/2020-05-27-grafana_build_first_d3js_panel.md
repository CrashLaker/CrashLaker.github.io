---
layout: post
title: "Grafana build first D3js panel"
comments: true
date: "2020-05-27 03:50:11.822000+00:00"
categories:  [grafana]
tags:  [panel]
---


https://grafana.com/tutorials/build-a-panel-plugin-with-d3/#1

```bash
npx @grafana/toolkit plugin:create my-plugin
cd my-plugin
yarn install
yarn dev
```

```javascript
import React, { useRef, useEffect } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { useTheme } from '@grafana/ui';

import { select } from 'd3';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();

  const d3Container = useRef(null);

  const values = [4, 8, 15, 16, 23, 42];

  useEffect(() => {
    if (d3Container.current) {
      const maxValue = Math.max.apply(
        Math,
        values.map(o => o)
      );

      const barHeight = height / values.length;

      const chart = select(d3Container.current)
        .attr('width', width)
        .attr('height', height);

      const bars = chart
        .selectAll('rect')
        .data(values)
        .enter()
        .append('rect');

      bars
        .attr('height', barHeight - 1)
        .attr('width', d => (d / maxValue) * width)
        .attr('transform', (d, i) => {
          return 'translate(0,' + i * barHeight + ')';
        })
        .attr('fill', theme.palette.greenBase);
    }
  }, [width, height, values, d3Container.current]);

  return <svg ref={d3Container}></svg>;
};
```

![](/assets/img/pE6uVO9zc_374e2b9a791acd3221cf56e7c36e9b55.png)


