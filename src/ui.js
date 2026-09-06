function pause(){X.fillStyle='rgba(3,5,11,.7)';X.fillRect(0,0,W,H);X.fillStyle='#fff';text('PAUSED',W/2,H/2,46,'center')}
function frame(t){let dt=Math.min(.033,(t-last)/1000||0);last=t;if(!paused&&state==='title')clock+=dt;update(dt);draw();requestAnimationFrame(frame)}requestAnimationFrame(frame);
