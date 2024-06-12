class Suspect extends Phaser.GameObjects.GameObject {
    constructor(scene, type, x, y, num) {
        super(scene, type);
        this.x = x;
        this.y = y;

        // Variables used for animation
        this.torsoDirection = -1;
        this.handsDirection = -1;
        this.itemDirection = -1;
        this.speed = 0.05;
        this.torsoMoveTime = Math.floor(Math.random() * 60) + 30;
        this.torsoMoveCounter = this.torsoMoveTime;
        this.handsMoveTime = Math.floor(Math.random() * 60) + 30;
        this.handsMoveCounter = this.handsMoveTime;
        this.itemMoveTime = Math.floor(Math.random() * 60) + 30;
        this.itemMoveCounter = this.itemMoveTime;
        
        this.shirtStyle = 1; // Save shirt style in a variable so it stays consistent when shirt color changes

        // Body parts/clothing
        this.neck = scene.add.sprite(x, y - 75, 'skin', 'tint1_neck.png');
        this.head = scene.add.sprite(x, y - 160, 'skin', 'tint1_head.png');
        this.leftBrow = scene.add.sprite(x - 32, y - 180, 'faces', 'brow_color1_style1.png');
        this.leftBrow.flipX = true;
        this.rightBrow = scene.add.sprite(x + 32, y - 180, 'faces', 'brow_color1_style1.png');
        this.leftEye = scene.add.sprite(x - 30, y - 160, 'faces', 'eye_color1_size1.png');
        this.rightEye = scene.add.sprite(x + 30, y - 160, 'faces', 'eye_color1_size1.png');
        this.nose = scene.add.sprite(x, y - 140, 'faces', 'nose_tint1_style1.png');
        this.mouth = scene.add.sprite(x, y - 110, 'faces', 'mouth1.png');
        this.shirt = scene.add.sprite(x, y, 'shirts', 'shirt_white_style'+this.shirtStyle+'.png');
        this.hair = scene.add.sprite(x, y - 200, 'hair', 'color1_style1.png');

        // Mask/item
        this.animalMask = scene.add.sprite(x, y - 160, 'animal_masks', 'bear.png').setScale(1.2);
        this.item = scene.add.sprite(x, y - 320, 'items', 'mug.png').setScale(0.9);
        this.animalMask.visible = false;
        this.item.visible = false;

        // Board with suspect number
        this.board = scene.add.rectangle(x, 555, 120, 65, '#505050');
        this.name = scene.add.bitmapText(x, 550, 'text_white', num, 80).setOrigin(0.5).setMaxWidth(900).setCenterAlign();

        // Hands
        this.leftHand = scene.add.sprite(x - 55, y + 30, 'skin', 'tint1_hand.png');
        this.leftHand.flipX = true;
        this.rightHand = scene.add.sprite(x + 55, y + 30, 'skin', 'tint1_hand.png');

        return this;
    }

    get_shirt() { 
        return this.shirt.frame.name.split('_')[1]; 
    }

    get_mask() {
        if (this.animalMask.visible == true) {
            return this.animalMask.frame.name.split('.')[0]; 
        }
        return '';
    }

    get_item() {
        if (this.item.visible == true) {
            return this.item.frame.name.split('.')[0]; 
        }
        return '';
    }

    change_shirt(newColor) {
        if (this.get_shirt() == newColor) {
            this.shirt.setTexture('shirts', 'shirt_white_style'+this.shirtStyle+'.png');
        } else {
            this.shirt.setTexture('shirts', 'shirt_'+newColor+'_style'+this.shirtStyle+'.png');
        }
    }

    change_mask(newAnimal) {
        if (this.animalMask.visible == true && this.get_mask() == newAnimal) {
            this.animalMask.visible = false;
        } else {
            this.animalMask.visible = true;
            this.animalMask.setTexture('animal_masks', newAnimal+'.png');
        }
    }

    change_item(newItem) {
        if (this.item.visible == true && this.get_item() == newItem) {
            this.item.visible = false;
        } else {
            this.item.visible = true;
            this.item.setTexture('items', newItem+'.png');
        }
    }

    randomize() {
        // Hide mask and item
        this.animalMask.visible = false;
        this.item.visible = false;
        // Get random integers for all sprite keys
        let rand_skin = Math.floor(Math.random() * 8) + 1;
        let rand_browStyle = Math.floor(Math.random() * 3) + 1;
        let rand_eyeColor = Math.floor(Math.random() * 5) + 1;
        let rand_eyeSize = Math.floor(Math.random() * 2) + 1;
        let rand_noseStyle = Math.floor(Math.random() * 3) + 1;
        let rand_mouth = Math.floor(Math.random() * 7) + 1;
        let rand_hairColor = Math.floor(Math.random() * 8) + 1;
        let rand_hairStyle = Math.floor(Math.random() * 14) + 1;
        let rand_shirtStyle = Math.floor(Math.random() * 8) + 1; // Base shirt color for all characters is white
        this.shirtStyle = rand_shirtStyle; // Save shirt style for color changes
        // Fix any incompatibilities
        if (rand_skin >= 3 && rand_hairColor == 6) { 
            while (rand_hairColor == 6) {
                rand_hairColor = Math.floor(Math.random() * 8) + 1;
            }
        }
        if (rand_hairStyle == 8 && (rand_shirtStyle == 4 || rand_shirtStyle == 8)) {
            while (rand_shirtStyle == 4 || rand_shirtStyle == 8) {
                rand_shirtStyle = Math.floor(Math.random() * 8) + 1;
            }
        }

        // Set new textures using random sprite key integers from above
        this.neck.setTexture('skin', 'tint'+rand_skin+'_neck.png');
        this.head.setTexture('skin', 'tint'+rand_skin+'_head.png');
        this.leftBrow.setTexture('faces', 'brow_color'+rand_hairColor+'_style'+rand_browStyle+'.png');
        this.rightBrow.setTexture('faces', 'brow_color'+rand_hairColor+'_style'+rand_browStyle+'.png');
        this.leftEye.setTexture('faces', 'eye_color'+rand_eyeColor+'_size'+rand_eyeSize+'.png');
        this.rightEye.setTexture('faces', 'eye_color'+rand_eyeColor+'_size'+rand_eyeSize+'.png');
        this.nose.setTexture('faces', 'nose_tint'+rand_skin+'_style'+rand_noseStyle+'.png');
        this.mouth.setTexture('faces', 'mouth'+rand_mouth+'.png');
        this.hair.setTexture('hair', 'color'+rand_hairColor+'_style'+rand_hairStyle+'.png');
        this.shirt.setTexture('shirts', 'shirt_white_style'+rand_shirtStyle+'.png');
        this.leftHand.setTexture('skin', 'tint'+rand_skin+'_hand.png');
        this.rightHand.setTexture('skin', 'tint'+rand_skin+'_hand.png');

        // Adjust hair x and y depending on hair style
        this.hair.y = this.y - 200;
        this.hair.x = this.x;
        if (rand_hairStyle == 5) {
            this.hair.x = this.x + 6;
        } else if (rand_hairStyle == 8) {
            this.hair.y = this.y - 170;
        } else if (rand_hairStyle == 9) {
            this.hair.y = this.y - 118;
            this.hair.x = this.x + 1;
        } else if (rand_hairStyle == 10) {
            this.hair.y = this.y - 141;
        } else if (rand_hairStyle == 11) {
            this.hair.y = this.y - 116;
            this.hair.x = this.x + 2;
        } else if (rand_hairStyle == 12) {
            this.hair.y = this.y - 146;
            this.hair.x = this.x + 1;
        } else if (rand_hairStyle == 13) {
            this.hair.y = this.y - 148;
            this.hair.x = this.x + 2;
        } else if (rand_hairStyle == 14) {
            this.hair.y = this.y - 152;
            this.hair.x = this.x + 1;
        }
    }

    update() {
        // Neck and shirt rise and fall
        this.torsoMoveCounter--;
        if (this.torsoMoveCounter == 0) {
            this.torsoMoveCounter = this.torsoMoveTime;
            this.torsoDirection *= -1;
        }
        this.neck.y += this.speed * this.torsoDirection;
        this.shirt.y += this.speed * this.torsoDirection;

        // Hands and board rise and fall
        this.handsMoveCounter--;
        if (this.handsMoveCounter == 0) {
            this.handsMoveCounter = this.handsMoveTime;
            this.handsDirection *= -1;
        }
        this.leftHand.y += this.speed * this.handsDirection;
        this.rightHand.y += this.speed * this.handsDirection;
        this.board.y += this.speed * this.handsDirection;
        this.name.y += this.speed * this.handsDirection;

        // Item rises and falls
        this.itemMoveCounter--;
        if (this.itemMoveCounter == 0) {
            this.itemMoveCounter = this.itemMoveTime;
            this.itemDirection *= -1;
        }
        this.item.y += this.speed * this.itemDirection;
    }
}