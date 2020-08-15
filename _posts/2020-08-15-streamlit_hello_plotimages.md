---
layout: post
title: "Streamlit Hello PlotImages"
comments: true
date: "2020-08-15 02:00:00.433000+00:00"
categories:  [programming]
tags:  [python, streamlit]
---




```python
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
import matplotlib.pyplot as plt
import io
import random


def return_plot():
    x = range(20)
    y = [random.randint(0,100) for i in x]
    df = pd.DataFrame({"x": x, "y": y})
    ax = df.set_index("x").plot(figsize=(18,6))
    plt.tight_layout()
    return ax.get_figure()

st.write("Welcome")

amount = st.text_input("how many images", 1)
amount = int(amount)

run = st.button("Run")

if run:
    for i in range(amount):
        fig = return_plot()
        output = io.BytesIO()
        FigureCanvas(fig).print_png(output)
        st.image(output.getvalue(), use_column_width=True)
        plt.cla()
        plt.clf()
```


![](/assets/img/fqqJ_E6-J_4c75c32897e4088098b5af39ee48f87b.png)
