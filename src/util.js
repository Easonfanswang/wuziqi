import { 
    DIRECTION,
    BASE_WIDTH, 
    BASE_HEIGHT, 
    CIRCLE,
    RADIUS } from "./const";
export function setStaticState(result) {
    if (result && result.length === 5) {
        return {
            gameOver: true
        }
    } else {
        return {
            gameOver: false
        }
    }
}

export function checkIsWin(arr, x, y) {
    let target = arr[x][y],
        rowLength = arr.length, // 棋盘高度
        colLength = arr[0].length, // 棋盘宽度
        startNode = { x, y },
        nodeList;
        
    function check(node) {
        /**
         * 检测是否越界
         */
        if (node.x >= rowLength || node.x < 0 || node.y >= colLength || node.y < 0) {
            return false;
        }
        if (arr[node.x][node.y] === target) {
            return true;
        }
        return false;
    }

    for (let i = 1; i <= 4; i++) {
        nodeList = [startNode];
        let left = startNode,
            right = startNode,
            leftVal = true,
            rightVal = true;

        // 从当前节点出发，左右或者上下同时检测，如果值与目标检测节点值target相同则nodeList的长度加一
        while (leftVal || rightVal) {
            if (leftVal) {
                left = getCoordinate(i, left, -1);
                leftVal = check(left) && nodeList.push(left);
            }
            if (rightVal) {
                right = getCoordinate(i, right, 1);
                rightVal = check(right) && nodeList.push(right);
            }
            // nodeList的长度是五即取得胜利
            if (nodeList.length === 5) {
                return nodeList;
            }
        }
    }
    return nodeList;
};

export function getCoordinate(direct, node, tag) {
    let newNode;
    let {
        HORIZONTAL,
        VERTICAL,
        LEFT_OBLIQUE,
        RIGHT_OBLIQUE } = DIRECTION;
    switch (direct) {
        case HORIZONTAL:
            newNode = {
                x: node.x,
                y: node.y + tag
            };
            break;
        case VERTICAL:
            newNode = {
                x: node.x + tag,
                y: node.y
            };
            break;
        case LEFT_OBLIQUE:
            newNode = {
                x: node.x + tag,
                y: node.y + tag
            };
            break;
        case RIGHT_OBLIQUE:
            newNode = {
                x: node.x - tag,
                y: node.y + tag
            };
            break;
        default:
            newNode = {
                x: -1,
                y: -1
            };
    }
    return newNode;
}

// 创建带初始值的二维数组
export function get2DArray(row, column, initialValue) {
    let result = [];
    for (let i = 0; i <= row; i++) {
        let rowArray = [];
        for (let j = 0; j <= column; j++) {
            rowArray[j] = initialValue;
        }
        result.push(rowArray);
    }
    return result;
}
//计算棋子在画布上的真实位置
export function getRealCoordinate(x, y) { 
    let realX = Math.round(x / BASE_WIDTH) * (BASE_WIDTH);
    let realY = Math.round(y / BASE_HEIGHT) * (BASE_HEIGHT);
    let realXIndex = Math.round((x - 40) / (BASE_WIDTH));
    let realYIndex = Math.round((y - 40) / (BASE_HEIGHT));
    return [realX, realY, realXIndex, realYIndex];
}
 //画圆
export function getCircle(ctx, x, y, r = RADIUS, fillStyle) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, CIRCLE);
    if (fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fill();
    } else {
        ctx.stroke();
    }
    ctx.closePath();
}