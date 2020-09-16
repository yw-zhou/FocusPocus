import matplotlib.pyplot as plt
import numpy as np


labels = ['08/10', '08/11', '08/12', '08/13', '08/14','08/15', '08/16']
p_means = [20, 34, 30, 35, 27,0,0]
d_means = [12, 5, 21, 17, 11,0,0]

x = np.arange(len(labels))  # the label locations
width = 0.35  # the width of the bars

fig, ax = plt.subplots()
rects1 = ax.bar(x - width/2, p_means, width, label='Productive')
rects2 = ax.bar(x + width/2, d_means, width, label='Distractions')

# Add some text for labels, title and custom x-axis tick labels, etc.
ax.set_ylabel('Sites Visited')
ax.set_title('Productive and Distractive Sites this week')
ax.set_xticks(x)
ax.set_xticklabels(labels)
ax.legend()


def autolabel(rects):
    """Attach a text label above each bar in *rects*, displaying its height."""
    for rect in rects:
        height = rect.get_height()
        ax.annotate('{}'.format(height),
                    xy=(rect.get_x() + rect.get_width() / 2, height),
                    xytext=(0, 3),  # 3 points vertical offset
                    textcoords="offset points",
                    ha='center', va='bottom')


autolabel(rects1)
autolabel(rects2)

fig.tight_layout()

plt.show()