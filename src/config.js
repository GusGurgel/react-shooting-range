// Globals
export default {
    gunSize: {
        width: 150,
        height: 150
    },
    targetSize: {
        width: 60,
        height: 60
    },
    shootDecalSize: {
        width: 30,
        height: 30
    },
    difficultyConfig: {
        Easy: {
            targetLifeTimeSeconds: 1.5,
            targetSpawnCooldown: 1.5,
            lifeDecrementPerTargetTimeout: 0.2,
            colorVariant: "success"
        },
        Medium: {
            targetLifeTimeSeconds: 0.8,
            targetSpawnCooldown: 0.8,
            lifeDecrementPerTargetTimeout: 0.3,
            colorVariant: "warning"
        },
        Hard: {
            targetLifeTimeSeconds: 0.7,
            targetSpawnCooldown: 0.5,
            lifeDecrementPerTargetTimeout: 0.3,
            colorVariant: "danger"
        }
    }
}