import {
    PerspectiveCamera,
    Plane,
    Raycaster,
    Vector2,
    Vector3,
    Object3D,
    Intersection,
} from 'three';
import { EventEmitter } from 'events';

export default class InteractiveControls extends EventEmitter {
    camera: PerspectiveCamera;
    el: HTMLElement;
    plane: Plane;
    raycaster: Raycaster;
    mouse: Vector2;
    offset: Vector3;
    intersection: Vector3;
    objects: Object3D[];
    hovered: Object3D | null;
    selected: Object3D | null;
    isDown: boolean;
    rect: { x: number; y: number; width: number; height: number };
    intersectionData: Intersection | null;
    private _enabled: boolean;
    private handlerDown: (e: MouseEvent | TouchEvent) => void;
    private handlerMove: (e: MouseEvent | TouchEvent) => void;
    private handlerUp: (e: MouseEvent | TouchEvent) => void;
    private handlerLeave: (e: MouseEvent) => void;

    get enabled(): boolean {
        return this._enabled;
    }

    constructor(camera: PerspectiveCamera, el: HTMLElement) {
        super();

        this.camera = camera;
        this.el = el;

        this.plane = new Plane();
        this.raycaster = new Raycaster();

        this.mouse = new Vector2();
        this.offset = new Vector3();
        this.intersection = new Vector3();

        this.objects = [];
        this.hovered = null;
        this.selected = null;
        this.intersectionData = null;

        this.isDown = false;
        this._enabled = false;
        this.rect = { x: 0, y: 0, width: 0, height: 0 };

        this.handlerDown = this.onDown.bind(this);
        this.handlerMove = this.onMove.bind(this);
        this.handlerUp = this.onUp.bind(this);
        this.handlerLeave = this.onLeave.bind(this);

        this.enable();
    }

    enable(): void {
        if (this.enabled) return;
        this.addListeners();
        this._enabled = true;
    }

    disable(): void {
        if (!this.enabled) return;
        this.removeListeners();
        this._enabled = false;
    }

    addListeners(): void {
        const isMobile = 'ontouchstart' in window;

        if (isMobile) {
            this.el.addEventListener('touchstart', this.handlerDown, { passive: true });
            this.el.addEventListener('touchmove', this.handlerMove, { passive: true });
            this.el.addEventListener('touchend', this.handlerUp, { passive: true });
        } else {
            this.el.addEventListener('mousedown', this.handlerDown);
            this.el.addEventListener('mousemove', this.handlerMove);
            this.el.addEventListener('mouseup', this.handlerUp);
            this.el.addEventListener('mouseleave', this.handlerLeave);
        }
    }

    removeListeners(): void {
        const isMobile = 'ontouchstart' in window;

        if (isMobile) {
            this.el.removeEventListener('touchstart', this.handlerDown);
            this.el.removeEventListener('touchmove', this.handlerMove);
            this.el.removeEventListener('touchend', this.handlerUp);
        } else {
            this.el.removeEventListener('mousedown', this.handlerDown);
            this.el.removeEventListener('mousemove', this.handlerMove);
            this.el.removeEventListener('mouseup', this.handlerUp);
            this.el.removeEventListener('mouseleave', this.handlerLeave);
        }
    }

    resize(x?: number, y?: number, width?: number, height?: number): void {
        if (x !== undefined && y !== undefined && width !== undefined && height !== undefined) {
            this.rect = { x, y, width, height };
        } else {
            this.rect = this.el.getBoundingClientRect();
        }
    }

    onMove(e: MouseEvent | TouchEvent): void {
        const t = 'touches' in e ? e.touches[0] : e;
        const touch = { x: t.clientX, y: t.clientY };

        this.mouse.x = ((touch.x - this.rect.x) / this.rect.width) * 2 - 1;
        this.mouse.y = -((touch.y - this.rect.y) / this.rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);

        const intersects = this.raycaster.intersectObjects(this.objects);

        if (intersects.length > 0) {
            const object = intersects[0].object;
            this.intersectionData = intersects[0];

            this.plane.setFromNormalAndCoplanarPoint(
                this.camera.getWorldDirection(this.plane.normal),
                object.position
            );

            if (this.hovered !== object) {
                this.emit('interactive-out', { object: this.hovered });
                this.emit('interactive-over', { object });
                this.hovered = object;
            } else {
                this.emit('interactive-move', { object, intersectionData: this.intersectionData });
            }
        } else {
            this.intersectionData = null;

            if (this.hovered !== null) {
                this.emit('interactive-out', { object: this.hovered });
                this.hovered = null;
            }
        }
    }

    onDown(e: MouseEvent | TouchEvent): void {
        this.isDown = true;
        this.onMove(e);

        this.emit('interactive-down', {
            object: this.hovered,
            previous: this.selected,
            intersectionData: this.intersectionData,
        });
        this.selected = this.hovered;

        if (this.selected) {
            if (this.raycaster.ray.intersectPlane(this.plane, this.intersection)) {
                this.offset.copy(this.intersection).sub(this.selected.position);
            }
        }
    }

    onUp(): void {
        this.isDown = false;
        this.emit('interactive-up', { object: this.hovered });
    }

    onLeave(): void {
        this.onUp();
        this.emit('interactive-out', { object: this.hovered });
        this.hovered = null;
    }

    destroy(): void {
        this.removeListeners();
        this.removeAllListeners();
    }
}
