xmin = 10000 #  1000000
ymin = 10000 #  1000000
zmin = 10000 #  1000000
xmax = -10000 #  1000000
ymax = -10000 #  1000000
zmax = -10000 #  1000000
source = 'original.obj'
target = 'cycle.obj'

for line in open(source):
  values = line.strip().split()
  if len(values) > 0:
    if values[0] == 'v':
      xc = float(values[1])
      yc = float(values[3])
      zc = float(values[2])
      if xc < xmin:
        xmin = xc
      if yc < ymin:
        ymin = yc
      if zc < zmin:
        zmin = zc
      if xc > xmax:
        xmax = xc
      if yc > ymax:
        ymax = yc
      if zc > zmax:
        zmax = zc

c = 0.72460833277168
print('x: ' + str(xmin * c) + ' ' + str(xmax * c))
print('y: ' + str(ymin * c) + ' ' + str(ymax * c))
print('z: ' + str(zmin * c) + ' ' + str(zmax * c))
out = open(target, 'wb')

for line in open(source):
  values = line.strip().split()
  if len(values) > 0:
    if values[0] == 'v':
      xi = float(values[1]) * c
      yj = -(float(values[3])) * c
      zk = float(values[2]) * c
      out.write('v ' + str(xi) + ' ' + str(yj) + ' ' + str(zk) + '\n')
    elif values[0] == 'vn':
      out.write('vn ' + values[1] + ' ' + str(-float(values[3])) + ' ' + values[2] + '\n')
    elif values[0] == 'f':
      out.write('f ' + values[3] + ' ' + values[2] + ' ' + values[1] + '\n')
    else:
      out.write(line.strip() + '\n')
  else:
    out.write('\n')
