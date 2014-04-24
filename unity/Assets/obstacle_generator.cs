using UnityEngine;
using System.Collections;

public class obstacle_generator : MonoBehaviour {

	public GameObject stone;

	public GameObject llama;

	public GameObject female;

	private float stoneX = 21;
	private float stoneY = -1;
	private float stoneZ = 0;

	private float delta = 0;
	private float delay = 1.5f;

	private ArrayList list = new ArrayList();

	private bool topLeft = true;
	private bool topRight = false;
	private bool bottomLeft = false;
	private bool bottomRight = false;

	// Use this for initialization
	void Start () {
		stoneX += llama.transform.position.x;
		stoneY += llama.transform.position.y;
		stoneZ += llama.transform.position.z;

	}
	
	// Update is called once per frame
	void Update () {
		delta += Time.deltaTime;
		if (delta >= delay && ((player_behaviour) llama.GetComponent("player_behaviour")).alive){
			delta = 0;
			delay = Random.Range(1000, 3000)/1000f;

			GameObject newStone;
			if (Random.Range(0, 100) < 80){
				newStone = (GameObject) Instantiate(stone);
				newStone.transform.position = new Vector3(stoneX, stoneY, stoneZ);
			}
			else{
				newStone = (GameObject) Instantiate(female);
				newStone.transform.position = new Vector3(stoneX-3, stoneY+1.5f, stoneZ);
			}

			list.Add (newStone);
		}

		foreach (GameObject stone in list) {
			if (stone.transform.position.x < stoneX - 24) {
				list.Remove(stone);
				Destroy (stone);
				break;
			}
		}
	}
}
