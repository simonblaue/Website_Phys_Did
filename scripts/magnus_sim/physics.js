
export function explicitEuler(func, Y0, delta_t, t_end, funcparams){
    let steps = t_end/delta_t

    let xs = Array()
    let ys = Array()

    xs.push(Y0[0])
    ys.push(Y0[1])

    let Y = Y0
    let t=0
    let f=0

    while (t<t_end){

        f = func(Y, funcparams)
        Y.forEach((_,idx) => {
            Y[idx] += delta_t*f[idx]
        })

        xs.push(Y[0])
        ys.push(Y[1])
        if (Math.abs(Y[0])>10 || Math.abs(Y[0])<-10 || (Math.abs(Y[1])>10 || Math.abs(Y[1])<-10)){
            return [xs,ys]
        }
        t+= delta_t
    }

    return [xs,ys]
}

// def magnus(xi,cm=0.5,cr=0.8,w=30,g=9.81):
//     vx = xi[2]
//     vy = xi[3]
//     ax = -cr*math.sqrt(vx**2+vy**2)*vx-cm*w*vy
//     ay = -g-cr*math.sqrt(vx**2+vy**2)*vx-cm*w*vx
//     return [vx,vy, ax, ay]