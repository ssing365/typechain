import crypto from "crypto";

interface BlockShape {
  hash: string; //블록간의 연결고리는 해쉬값이다.
  prevHash: string; //이전 해쉬
  height: number; //블록의 위치를 표시해주는 숫자
  data: string; //블록이 보호할 데이터
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calHash(prevHash, height, data); //static method
  }

  static calHash(prevHash: string, height: number, data: string): string {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
  //이전해쉬값, 위치(height), 데이터로 해쉬값(엄청 이상한 스트링)이 만들어진다.
  //어떤 컴퓨터에서 입력해도 입력값이 같으면 해쉬는 언제나 같은 결과값이 나옴.
}

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newBlock);
  }
  public getBlocks() {
    return [...this.blocks]; //해킹 방지
  }
}

const BC = new Blockchain();
BC.addBlock('first one');
BC.addBlock('second one');
BC.addBlock('third one');

console.log(BC.getBlocks());
