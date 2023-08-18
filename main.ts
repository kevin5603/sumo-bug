function goSearching () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 30)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 30)
    searching = true
    while (searching) {
        distance = maqueen.Ultrasonic(PingUnit.Centimeters)
        if (distance > 0 && distance < 15) {
            found = true
            searching = false
        }
    }
}
function goBack () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 30)
    basic.pause(executionTime)
}
function goPush () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 30)
    pushing = true
    startTime = input.runningTime()
    while (pushing) {
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 0)
            pushing = false
        }
    }
    executionTime = input.runningTime() - startTime
}
let startTime = 0
let pushing = false
let executionTime = 0
let distance = 0
let searching = false
let found = false
let active = true
while (active) {
    found = false
    goSearching()
    if (found) {
        goPush()
        goBack()
    } else {
        active = false
    }
}
