ymin = 0 #  1000000
source = 'original.obj'
target = 'cycle.obj'

for line in open(source):
  values = line.strip().split()
  if len(values) > 0:
    if values[0] == 'v':
      yc = float(values[3])
      if yc < ymin:
        ymin = yc

print('min y: ' + str(ymin))
out = open(target, 'wb')
c = 0.3047999995367

for line in open(source):
  values = line.strip().split()
  if len(values) > 0:
    if values[0] == 'v':
      xi = float(values[1]) * c
      yj = -(float(values[3]) - ymin) * c
      zk = float(values[2]) *c
      out.write('v ' + str(xi) + ' ' + str(yj) + ' ' + str(zk) + '\n')
    elif values[0] == 'vn':
      out.write('vn ' + values[1] + ' ' + str(-float(values[3])) + ' ' + values[2] + '\n')
    elif values[0] == 'f':
      out.write('f ' + values[3] + ' ' + values[2] + ' ' + values[1] + '\n')
    else:
      out.write(line.strip() + '\n')
  else:
    out.write('\n')
    
