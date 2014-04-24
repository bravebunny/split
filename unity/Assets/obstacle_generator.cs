using UnityEngine;
using System.Collections;

public class obstacle_generator : MonoBehaviour {

	public GameObject stone;

	private float stoneX = 11;
	private float stoneY = -20;
	private float stoneZ = 0;

	private float delta = 0;
	private float delay = 1.5f;

	private ArrayList list = new ArrayList();

	// Use this for initialization
	void Start () {

	}
	
	// Update is called once per frame
	void Update () {
		delta += Time.deltaTime;
		if (delta >= delay){
			delta = 0;
			delay = Random.Range(1000, 3000)/1000f;

			GameObject newStone = (GameObject) Instantiate(stone);
			newStone.transform.position = new Vector3(stoneX, stoneY, stoneZ);

			list.Add (newStone);

			if (list.Count > 10){
				Destroy((GameObject) list[0]);
				list.RemoveAt(0);
			}
		}
	}
}
