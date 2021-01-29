---
layout: post
title: "Study Create Grafana Plugin"
comments: true
date: "2021-01-26 03:41:21.973000+00:00"
---


* https://grafana.com/tutorials/
    * https://grafana.com/tutorials/build-a-panel-plugin/
    * https://grafana.com/tutorials/build-a-panel-plugin-with-d3/
    * https://developers.grafana.com/ui/latest/index.html?path=/story/docs-overview-intro--page
    * https://github.com/grafana/grafana-plugin-examples
        * flot https://github.com/grafana/grafana-plugin-examples/blob/master/flot
        * [frame-select](https://github.com/grafana/grafana-plugin-examples/blob/master/frame-select) demonstrates how to update panel options with values from a data query response
        * plotly https://github.com/grafana/grafana-plugin-examples/blob/master/plotly
        * scatterplot https://github.com/grafana/grafana-plugin-examples/blob/master/scatterplot
        * visx https://github.com/grafana/grafana-plugin-examples/blob/master/visx
* https://medium.com/@hariom.2711/grafana-react-panel-plugins-545cb9afa42d
    * https://github.com/narang99/grafana-plugin-tutorial
    * https://www.youtube.com/watch?v=Y31wnP_jDBY&feature=emb_logo&ab_channel=Grafana (class based. little bit outdated)
        * https://github.com/grafana/attic/tree/master/react-plugin-examples
* Add CustomEditor
    * https://community.grafana.com/t/grafana-7-plugin-plugin-dev-dynamically-adding-options/30865/2
        * https://github.com/marcusolsson/grafana-treemap-panel/blob/master/src/module.ts

Useful:
* https://developers.grafana.com/ui
* https://www.youtube.com/watch?v=4RLoHg4G9MI&t=1401s&ab_channel=Grafana
* Examples
    * (reactjs - very good stuff!) https://github.com/grafana/clock-panel
    * (angular0 https://github.com/grafana/piechart-panel
    * Outdated
        * https://github.com/grafana/attic
* Plugin Signature
    * https://grafana.com/docs/grafana/latest/plugins/plugin-signatures/
        * https://grafana.com/docs/grafana/latest/developers/plugins/sign-a-plugin/
* Source:
    * Grafana-UI components  https://github.com/grafana/grafana/tree/master/packages/grafana-ui/src/components


Issues:
* [missing ValueMappingsEditor and ThresholdsEditor export #26554
](https://github.com/grafana/grafana/issues/26554)
    * 

Notes:

`SomePanel.tsx`

```javascript
export const HorizonPanel: React.FC<Props> = ({ options, data, width, height }) => {
```

`data`
```javascript
{
    timeRange: {from, to, raw: {from: 'now-6h', to: 'now'}},
    request: {
        interval: '20s',
        intervalMs: 20000,
        maxDataPoints: 1041,
        range: {
            from: Date(),
            to: Date(),
            raw: {from: 'now-6h', to: 'now'}
        },
        rangeRaw: {from: 'now-6h', to: 'now'},
        targets: [
            {
                datasource: 'TestData DB',
                refId: 'A',
                scenarioId: 'random_walk',
            }
        ]
    },
    series: [
        length: 1081,
        name: 'A-series',
        refId: 'A',
        fields: [
            {
                name: 'Time',
                type: 'time',
                config: {unit: 'time:YYYY-MM-DD HH:mm:ss'},
                values: {
                    buffer: [
                        ...values
                        milliseconds
                        new Data(milliseconds)
                    ]
                }
                
            },
            {
               name: 'Value',
               type: 'number',
               config: {
                  max: <max value>,
                  min: <min value>,
                  thresholds: {
                      mode: 'absolute',
                      steps: [
                          {color: 'green', value: -Infinity},
                          {color: 'red', value: 80},
                      ]
                  },
                  unit: undefined
               },
               values: {
                   buffer: [
                       ...values
                   ]
               }
            }
        ]
    ]

}
```

`options`
```javascript
{
    barWidth: [5],
    bezelOffset: [23],
    color: 'red',
    showValuesRuler: false,
    sketchy: false,
    useMirror: false,
    useVis: 'regular',
}
```




























